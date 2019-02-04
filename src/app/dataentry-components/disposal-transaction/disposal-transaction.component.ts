import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DisposalTransactionService, DisposalTransactionListItem } from '../../dataentry-services/disposal-transaction.service';
import { Router } from '@angular/router';

// create variables to store data if needed for editing transactions
let tDate: Date;
let tFacility: string;
let tTransactionType: string;
let tIsTons: string;
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
  form: FormGroup;
  // TODO delete this with proper call for appropriate Facility List
  dummyFacility = ['Camp Swampy Incinerator', 'Camp Swampy Landfill'];

  // enable singleton services and other controllers
  constructor(private disposalTransactionService: DisposalTransactionService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    // create the initial bindings to form values
    this.form = this.formBuilder.group({
      actionDate: ['', Validators.required],
      facility: ['', Validators.required],
      weight: ['', Validators.required],
      transactionType: ['', Validators.required],
      costOrRevenue: ['', Validators.required],
      poundsOrTons: ['', Validators.required],
      costByWeight: ['', Validators.required],
      finalCost: ({ value: '0.00', readOnly: true })
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
      console.log('edit mode');
      editMode = true;
      tDate = currentTransactionData.date;
      tFacility = currentTransactionData.facility;
      tTransactionType = currentTransactionData.isActualWeight;
      tIsRevenue = currentTransactionData.isRevenue;
      tIsTons = currentTransactionData.isTons;
      tWeight = currentTransactionData.weight;
      tCostByWeight = currentTransactionData.unitCost;
      this.form.patchValue({actionDate: tDate, facility: tFacility, transactionType: tTransactionType, costOrRevenue: tIsRevenue,
      poundsOrTons: tIsTons, weight: tWeight, costByWeight: tCostByWeight});
    } else {
      // If there isn't an active transaction, ensure component is aware that it is a new transaction
      editMode = false;
    }
  }


  // Submit button Method
  SaveSubmit() {
    console.log(this.form.value);

    const currentTransactionData: any = this.disposalTransactionService.FetchChosenTransaction();
    // Check for Edit Mode to apply changes
    if (editMode === true) {
      // TODO replace with live API instead
      let currentStore = sessionStorage.mockData;
      const currentStoreObject = JSON.parse(currentStore);

      // translate fake data into facility TODO Replace
      let submitFacilityTypeValue = '';
      if (this.form.value.facility === 'Camp Swampy Incinerator') {
        submitFacilityTypeValue = 'I';
      } else if (this.form.value.facility === 'Camp Swampy Landfill') {
        submitFacilityTypeValue = 'D';
      }

      const formObject: DisposalTransactionListItem = {
        transactionId: currentTransactionData.transactionId,
        date: this.form.value.actionDate,
        isActualWeight: this.form.value.transactionType,
        isRevenue: this.form.value.costOrRevenue,
        isTons: this.form.value.poundsOrTons,
        weight: this.form.value.weight,
        unitCost: this.form.value.costByWeight,
        facility: this.form.value.facility,
        facilityType: submitFacilityTypeValue,
        totalCost: this.form.value.finalCost
      };
      console.log(formObject);

      for (let i = 0; i < currentStoreObject.serverPacket.length; i++) {
        if (currentStoreObject.serverPacket[i].transactionId === formObject.transactionId) {
          currentStoreObject.serverPacket[i].date = formObject.date.toLocaleDateString();
          currentStoreObject.serverPacket[i].isActualWeight = formObject.isActualWeight;
          currentStoreObject.serverPacket[i].isRevenue = formObject.isRevenue;
          currentStoreObject.serverPacket[i].isTons = formObject.isTons;
          currentStoreObject.serverPacket[i].weight = formObject.weight;
          currentStoreObject.serverPacket[i].unitCost = formObject.unitCost;
          currentStoreObject.serverPacket[i].facility = formObject.facility;
          currentStoreObject.serverPacket[i].facilityType = formObject.facilityType;
          currentStoreObject.serverPacket[i].totalCost = formObject.totalCost;
        }
      }

      currentStore = JSON.stringify(currentStoreObject);
      sessionStorage.mockData = currentStore;
      this.ClearChosenTransaction();
    } else {
      // grab current mock data TODO REPLACE WITH API
      let currentStore = sessionStorage.mockData;
      const currentStoreObject = JSON.parse(currentStore);
      // translate fake data into facility TODO Replace
      let submitFacilityTypeValue = '';
      if (this.form.value.facility === 'Camp Swampy Incinerator') {
        submitFacilityTypeValue = 'I';
      } else if (this.form.value.facility === 'Camp Swampy Landfill') {
        submitFacilityTypeValue = 'D';
      }

      // store data for mapping into a new JSON
      const formObject: DisposalTransactionListItem = {
        // TODO Grab AKO ID INSTEAD and then HASH - apply additional logic to import facility TYPE data
        transactionId: ('DemoUser' + this.form.value.actionDate.toLocaleDateString()),
        date: this.form.value.actionDate.toLocaleDateString(),
        isActualWeight: this.form.value.transactionType,
        isRevenue: this.form.value.costOrRevenue,
        isTons: this.form.value.poundsOrTons,
        weight: this.form.value.weight,
        unitCost: this.form.value.costByWeight,
        facility: this.form.value.facility,
        facilityType: submitFacilityTypeValue,
        totalCost: this.form.value.finalCost
      };

      currentStoreObject.serverPacket.push(formObject);
      currentStore = JSON.stringify(currentStoreObject);
      sessionStorage.mockData = currentStore;
    }

    this.router.navigateByUrl('/disposal');
  }

  tonsReset() {
    this.form.controls.weight.patchValue('');
    this.form.controls.unitCost.patchValue('');
  }

  // clear transaction service to avoid side effects

  ClearChosenTransaction() {
    this.disposalTransactionService.ClearChosenTransaction();
  }

}
