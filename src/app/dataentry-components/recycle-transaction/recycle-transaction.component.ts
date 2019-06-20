import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecyclingTransactionService } from '../../dataentry-services/recycling-transaction.service';
import { Router } from '@angular/router';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';
import { RESTClient } from 'src/app/json-client.service';

// create variables to store data if needed for editing transactions
let tDate: Date;
let tFacility: string;
let tRecyclingType: string;
let tComments: string;
let tIsTons: string;
let tIsRevenue: string;
let tWeight: number;
let tCostByWeight: number;
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

    // initiate bindings for form values
    this.form = this.formBuilder.group({
      actionDate: ['', Validators.required],
      tenant: ['', Validators.required],
      recyclingCat: ['', Validators.required],
      recyclingType: ['', Validators.required],
      comments: [''],
      weight: ['', Validators.required],
      transactionType: ['', Validators.required],
      isQRP: [''],
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

    // grab edit mode target if relevant
    const currentTransactionData: any = this.recyclingTransactionService.FetchChosenTransaction();
    console.log(currentTransactionData);

    // apply current transaction data to form for editing
    if (currentTransactionData) {
      console.log('edit mode');
      editMode = true;
      tDate = currentTransactionData.date;
      tFacility = currentTransactionData.facility;
      tRecyclingType = currentTransactionData.recyclingType;
      tIsRevenue = currentTransactionData.isRevenue;
      tIsTons = currentTransactionData.isTons;
      tComments = currentTransactionData.comments;
      tWeight = currentTransactionData.weight;
      tCostByWeight = currentTransactionData.unitCost;
      this.form.patchValue({actionDate: tDate, facility: tFacility, recyclingType: tRecyclingType, comments: tComments,
      costOrRevenue: tIsRevenue, poundsOrTons: tIsTons, weight: tWeight, costByWeight: tCostByWeight});
    } else {
      // If there isn't an active transaction, ensure component is aware that it is a new transaction
      editMode = false;
    }
  }

  SaveSubmit() {
    // TODO add logic based on REST call - not using dummy data
  }

  ClearChosenTransaction() {
    this.recyclingTransactionService.ClearChosenTransaction();
  }

}
