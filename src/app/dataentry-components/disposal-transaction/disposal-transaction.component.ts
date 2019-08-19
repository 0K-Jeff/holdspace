import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DisposalTransactionService } from '../../dataentry-services/disposal-transaction.service';
import { Router } from '@angular/router';
import { RESTClient } from 'src/app/json-client.service';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';

// create variables to store data if needed for editing transactions
let tDate: Date;
let tFacility: string;
let tIsActualWeight: string;
let tIsRevenue: string;
let tWeight: number;
let tCostByWeight: number;
let editMode = false;


@Component({
  selector: 'app-disposal-transaction',
  templateUrl: './disposal-transaction.component.html',
  styleUrls: ['./disposal-transaction.component.css']
})

export class DisposalTransactionComponent implements OnInit {
  facilityList;
  tenantList;
  form: FormGroup;
  // enable singleton services and other controllers
  constructor(private disposalTransactionService: DisposalTransactionService,
              private formBuilder: FormBuilder,
              private restClient: RESTClient,
              private router: Router,
              private installationService: InstallationServiceService) { }

  ngOnInit() {
    // implement facility list based on current or previous values
    const blob = this.installationService.FetchChosenInstallation();
    this.facilityList = this.installationService.FetchFacilities();
    this.tenantList = blob.tenantList;
    // bind for handoff
    this.GoBackToList = this.GoBackToList.bind(this);
    // create the initial bindings to form values
    this.form = this.formBuilder.group({
      actionDate: ['', Validators.required],
      facility: ['', Validators.required],
      tenant: [''],
      weight: ['', Validators.required],
      transactionType: ['', Validators.required],
      costOrRevenue: ['', Validators.required],
      costByWeight: ['', Validators.required],
      finalCost: ({ value: '0.00', readOnly: true }),
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

    // grab edit mode target if relevant
    const currentTransactionData: any = this.disposalTransactionService.FetchChosenTransaction();
    console.log(currentTransactionData);

    // apply current transaction data to form for editing
    if (currentTransactionData) {
      const removeIt = document.getElementById('datePickIcon');
      removeIt.classList.toggle('invisify');
      const datePicker: any = document.getElementById('datePickField');
      datePicker.readOnly = true;
      if (currentTransactionData.infoSourceCode === 'WA') {
        tIsActualWeight = 'actual';
      } else {
        tIsActualWeight = 'estimated';
      }
      if (currentTransactionData.isRevenue === 0) {
        tIsRevenue = 'cost';
      } else {
        tIsRevenue = 'revenue';
      }
      console.log('edit mode');
      editMode = true;
      tDate = new Date(currentTransactionData.sldWstCDTM);
      tFacility = currentTransactionData.facId;
      tWeight = currentTransactionData.sldWstWeight;
      tCostByWeight = currentTransactionData.trnsWstFeeAm;
      this.form.patchValue({actionDate: tDate, facility: tFacility, transactionType: tIsActualWeight, costOrRevenue: tIsRevenue,
      weight: tWeight, costByWeight: tCostByWeight, tenant: currentTransactionData.tenantId,
      invoiceNo: currentTransactionData.invoiceNumber, localUseBox: currentTransactionData.localUse});
    } else {
      // If there isn't an active transaction, ensure component is aware that it is a new transaction
      editMode = false;
    }
  }

  // Submit button Method
  SaveSubmit() {
    const currentTransactionData: any = this.disposalTransactionService.FetchChosenTransaction();
    // Check for Edit Mode to apply changes
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
        sldWstCDTM: currentTransactionData.sldWstCDTM,
        tenantId: this.form.value.tenant,
        tenant: currentTransactionData.tenant,
        dcId: currentTransactionData.dcId,
        facId: this.form.value.facility,
        wstTypeCode: currentTransactionData.wstTypeCode,
        orgId: currentTransactionData.orgId,
        recTypeCode: currentTransactionData.recTypeCode,
        recCatCode: currentTransactionData.recCatCode,
        sldWstWeight: this.form.value.weight,
        splitPct: currentTransactionData.splitPct,
        trnsWstFeeAm: this.form.value.costByWeight,
        infoSourceCode: typeShortHand,
        trnsWstAshCode: 0, // TODO figure out how this shit works
        isRevenue: shortHandRevenue,
        localUse: this.form.value.localUseBox,
        volumeConvRate: currentTransactionData.volumeConvRate,
        volumeConvUnit: currentTransactionData.volumeConvUnit,
        userId: currentTransactionData.userId,
        invoiceNumber: this.form.value.invoiceNo,
        mrfDisposalTypeCode: currentTransactionData.mrfDisposalTypeCode,
        splitActWeight: currentTransactionData.splitActWeight,
        cdFundCode: currentTransactionData.cdFundCode
      };
      this.restClient.createEditDisposalTransaction(formDataBundle, this.GoBackToList);
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
        // TODO fix with correct lookups
        instId: instData.instId,
        sldWstCDTM: (submitDate.getTime()) + timeUpdate,
        tenantId: this.form.value.tenant,
        tenant: null,
        dcId: instData.dcId,
        facId: this.form.value.facility,
        wstTypeCode: 'N',
        orgId: null,
        recTypeCode: null,
        recCatCode: null,
        sldWstWeight: this.form.value.weight,
        splitPct: null,
        trnsWstFeeAm: this.form.value.costByWeight,
        infoSourceCode: typeShortHand,
        trnsWstAshCode: 0,
        isRevenue: shortHandRevenue,
        localUse: this.form.value.localUseBox,
        volumeConvRate: null,
        volumeConvUnit: null,
        userId: instData.userId,
        invoiceNumber: this.form.value.invoiceNo,
        mrfDisposalTypeCode: null,
        splitActWeight: null,
        cdFundCode: null
      };
      this.restClient.createEditDisposalTransaction(formDataBundle, this.GoBackToList);
    }
  }

  // clear transaction service to avoid side effects

  ClearChosenTransaction() {
    this.disposalTransactionService.ClearChosenTransaction();
  }

  GoBackToList() {
    this.router.navigateByUrl('/disposal');
  }

}
