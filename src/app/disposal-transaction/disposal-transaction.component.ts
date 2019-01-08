import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DisposalTransactionService, DisposalTransactionListItem } from '../disposal-transaction.service';

// create variables to store data if needed for editing transactions
let tDate: Date;
let tFacility: string;
let tTransactionType: string;
let tIsTons: string;
let tIsRevenue: string;
let tWeight: number;
let tCostByWeight: number;

@Component({
  selector: 'app-disposal-transaction',
  templateUrl: './disposal-transaction.component.html',
  styleUrls: ['./disposal-transaction.component.css']
})

export class DisposalTransactionComponent implements OnInit {
  form: FormGroup;

  constructor(private disposalTransactionService: DisposalTransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // create the initial bindings to form values
    this.form = this.formBuilder.group({
      actionDate: [],
      facilityType: [''],
      weight: [''],
      transactionType: [''],
      costOrRevenue: [''],
      poundsOrTons: [''],
      costByWeight: [''],
      finalCost: ['']
    });

    // grab edit mode target if relevant
    const currentTransactionData: any = this.disposalTransactionService.FetchChosenTransaction();
    console.log(currentTransactionData);

    // apply current transaction data to form for editing
    if (currentTransactionData) {
      tDate = currentTransactionData.date;
      tFacility = currentTransactionData.facility;
      tTransactionType = currentTransactionData.isActualWeight;
      tIsRevenue = currentTransactionData.isRevenue;
      tIsTons = currentTransactionData.isTons;
      tWeight = currentTransactionData.weight;
      tCostByWeight = currentTransactionData.costByWeight;
      this.form.patchValue({actionDate: tDate, facilityType: tFacility, transactionType: tTransactionType, costOrRevenue: tIsRevenue,
      poundsOrTons: tIsTons, weight: tWeight, costByWeight: tCostByWeight});
    }
  }

  SaveSubmit() {
    console.log(this.form.value);
  }

  ClearChosenTransaction() {
    this.disposalTransactionService.ClearChosenTransaction();
  }

}
