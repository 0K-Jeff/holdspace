import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecyclingTransactionService } from '../../dataentry-services/recycling-transaction.service';
import { Router } from '@angular/router';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';
import { RESTClient } from 'src/app/json-client.service';

// create variables to store data if needed for editing transactions
let tDate: Date;
let tRecyclingType: string;
let tComments: string;
let tWeightActual: string;
let tIsQRP: string;
let tTenant: number;
let tIsRevenue: string;
let tRecyclingCat;
let tWeight: number;
let tCostByWeight: number;
let tInvoNo: string;
let tLocalUse: string;
let editMode = false;

@Component({
  selector: 'app-recycle-transaction',
  templateUrl: './recycle-transaction.component.html',
  styleUrls: ['./recycle-transaction.component.css']
})
export class RecycleTransactionComponent implements OnInit {
  form: FormGroup;
  recycleCategory;
  tenantList;
  recycleType;

  public disableDate = false;

  // enable singleton services and other controllers
  constructor(private recyclingTransactionService: RecyclingTransactionService,
              private formBuilder: FormBuilder,
              private installationService: InstallationServiceService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
    // implement recycle type and cat lists TODO
    const blob = this.installationService.FetchChosenInstallation();
    this.recycleCategory = this.installationService.FetchRecyclingCat();
    this.recycleType = this.installationService.FetchRecyclingTypes();
    this.tenantList = blob.tenantList;
    // bind for handoff
    this.GoBackToList = this.GoBackToList.bind(this);
    // initiate bindings for form values
    this.form = this.formBuilder.group({
      actionDate: ['', Validators.required],
      tenant: [''],
      recyclingCat: ['', Validators.required],
      recyclingType: ['', Validators.required],
      weight: ['', Validators.required],
      transactionType: ['', Validators.required],
      isQRP: ['', Validators.required],
      costOrRevenue: ['', Validators.required],
      costByWeight: ['', Validators.required],
      finalCost: ({ value: '0.00', readOnly: true}),
      invoiceNo: [''],
      localUseBox: ['']
    });

    // subscribe finalCost to other values to calculate reactively
    this.form.controls.finalCost.patchValue(0.00);
    this.form.valueChanges.subscribe(val => {
      if (this.form.value.costByWeight >= 0 && this.form.value.weight >= 0) {
        const newFinal = (this.form.value.weight * this.form.value.costByWeight).toFixed(2);
        this.form.controls.finalCost.patchValue(newFinal, {emitEvent: false});
      }
    });
    this.form.controls.recyclingCat.valueChanges.subscribe(val => {
      this.form.controls.recyclingType.patchValue(0);
      const trimmerValue = val;
      this.recycleType = [];
      const typeSource: any = this.installationService.FetchRecyclingTypes();
      const trimmedValueSet = [];
      for (let i = 0; i < typeSource.length; i++ ) {
        if (typeSource[i].recCatCode === trimmerValue) {
          trimmedValueSet.push(typeSource[i]);
        }
      }
      this.recycleType = trimmedValueSet;
    });

    // grab edit mode target if relevant
    const currentTransactionData: any = this.recyclingTransactionService.FetchChosenTransaction();
    console.log(currentTransactionData);

    // apply current transaction data to form for editing
    if (currentTransactionData) {
      const removeIt = document.getElementById('datePickIcon');
      removeIt.classList.toggle('invisify');
      const datePicker: any = document.getElementById('datePickField');
      datePicker.readOnly = true;
      if (currentTransactionData.infoSource === 'WA') {
        tWeightActual = 'actual';
      } else {
        tWeightActual = 'estimated';
      }
      if (currentTransactionData.isCost === 0) {
        tIsRevenue = 'cost';
      } else {
        tIsRevenue = 'revenue';
      }
      if (currentTransactionData.isQrp === 1) {
        tIsQRP = '1';
      } else {
        tIsQRP = '0';
      }
      console.log('edit mode');
      editMode = true;
      tDate = new Date(currentTransactionData.rswCalDtZz);
      tTenant = currentTransactionData.tenantId;
      tRecyclingType = currentTransactionData.recTypeCode;
      tRecyclingCat = currentTransactionData.recCatCode;
      tComments = currentTransactionData.comments;
      tWeight = currentTransactionData.origRswWt;
      tInvoNo = currentTransactionData.invoiceNumber;
      tLocalUse = currentTransactionData.rswLocUseTx;
      // legacy data support - split transactions deprecated in rebuild
      if (currentTransactionData.origRswWt === null) {
        tWeight = currentTransactionData.splitActWt;
      }
      tCostByWeight = currentTransactionData.rswRevAm;
      // patchvalues
      this.form.patchValue({actionDate: tDate, recyclingCat: tRecyclingCat, isQRP: tIsQRP,
      recyclingType: tRecyclingType, comments: tComments, transactionType: tWeightActual,
      tenant: tTenant, invoiceNo: tInvoNo, localUseBox: tLocalUse,
      costOrRevenue: tIsRevenue, weight: tWeight, costByWeight: tCostByWeight});
    } else {
      // If there isn't an active transaction, ensure component is aware that it is a new transaction
      editMode = false;
    }
  }

  SaveSubmit() {
    const currentTransactionData: any = this.recyclingTransactionService.FetchChosenTransaction();
    // Check for Edit Mode or new Entry
    if (editMode === true) {
      let typeShortHand;
      let shortHandRevenue;
      const submitDate = new Date(this.form.value.actionDate);
      const timeUpdate = (new Date().getTime() - new Date(new Date().toLocaleDateString()).getTime());
      if (this.form.value.transactionType === 'actual') {
        typeShortHand = 'WA';
      } else {
        typeShortHand = 'WE';
      }
      if (this.form.value.costOrRevenue === 'cost') {
        shortHandRevenue = 0;
      } else {
        shortHandRevenue = 1;
      }
      const formDataBundle = {
        instId: currentTransactionData.instId,
        rswCalDtZz: currentTransactionData.rswCalDtZz,
        dcId: currentTransactionData.dcId,
        tenantId: this.form.value.tenant,
        tenant: null,
        orgId: currentTransactionData.orgId,
        recTypeCode: this.form.value.recyclingType,
        recCatCode: this.form.value.recyclingCat,
        rswWt: this.form.value.weight,
        origRswWt: this.form.value.weight,
        splitPct: currentTransactionData.splitPct,
        rswRevAm: this.form.value.costByWeight,
        infoSource: typeShortHand,
        rswDrmoCode: currentTransactionData.rswDrmoCode,
        isCost: currentTransactionData.isCost,
        rswLocUseTx: this.form.value.localUseBox,
        volConvRate: currentTransactionData.volConvRate,
        volConvUnit: currentTransactionData.volConvUnit,
        userId: currentTransactionData.userId,
        invoiceNumber: this.form.value.invoiceNo,
        splitActWt: currentTransactionData.splitActWt,
        isQrp: this.form.value.isQRP,
        cdFundCode: currentTransactionData.cdFundCode
      };
      this.restClient.createEditRecyclingTransaction(formDataBundle, this.GoBackToList);
    } else {
      const instData = this.installationService.FetchChosenInstallation();
      let typeShortHand;
      let shortHandRevenue;
      const submitDate = new Date(this.form.value.actionDate);
      const timeUpdate = (new Date().getTime() - new Date(new Date().toLocaleDateString()).getTime());
      if (this.form.value.transactionType === 'actual') {
        typeShortHand = 'WA';
      } else {
        typeShortHand = 'WE';
      }
      if (this.form.value.costOrRevenue === 'cost') {
        shortHandRevenue = 0;
      } else {
        shortHandRevenue = 1;
      }
      const formDataBundle = {
        instId: instData.instId,
        rswCalDtZz: (submitDate.getTime()) + timeUpdate,
        dcId: instData.dcId,
        tenantId: this.form.value.tenant,
        tenant: null,
        orgId: 0, // TODO WHAT IS THIS EVEN
        recTypeCode: this.form.value.recyclingType,
        recCatCode: this.form.value.recyclingCat,
        rswWt: this.form.value.weight,
        origRswWt: this.form.value.weight,
        splitPct: null,
        rswRevAm: this.form.value.costByWeight,
        infoSource: typeShortHand,
        rswDrmoCode: 0, // TODO FIGURE OUT THIS CRAP
        isCost: 0,
        rswLocUseTx: this.form.value.localUseBox,
        volConvRate: null,
        volConvUnit: null,
        userId: instData.userId,
        invoiceNumber: this.form.value.invoiceNo,
        splitActWt: null,
        isQrp: this.form.value.isQRP,
        cdFundCode: null
      };
      this.restClient.createEditRecyclingTransaction(formDataBundle, this.GoBackToList);
    }
  }

  ClearChosenTransaction() {
    this.recyclingTransactionService.ClearChosenTransaction();
  }

  GoBackToList() {
    this.router.navigateByUrl('/recycling');
  }

}
