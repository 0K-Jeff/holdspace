import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DisposalTransactionService, DisposalTransactionListItem } from '../disposal-transaction.service';

let tDate: Date;
let tFacility: string;
let tType: string;
let tCost = '0';

@Component({
  selector: 'app-disposal-transaction',
  templateUrl: './disposal-transaction.component.html',
  styleUrls: ['./disposal-transaction.component.css']
})

export class DisposalTransactionComponent implements OnInit {
  form: FormGroup;

  constructor(private disposalTransactionService: DisposalTransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      actionDate: [],
      facilityType: [''],
      finalCost: [''],
      weight: ['']
    });

    const currentTransactionData: any = this.disposalTransactionService.FetchChosenTransaction();
    console.log(currentTransactionData);

    if (currentTransactionData) {
      tDate = currentTransactionData.date;
      tFacility = currentTransactionData.facility;
      tType = currentTransactionData.facilityType;
      tCost = currentTransactionData.totalCost;
      this.form.patchValue({actionDate: tDate, facilityType: tFacility, finalCost: ['$' + tCost]});
    }
  }

  ClearChosenTransaction() {
    this.disposalTransactionService.ClearChosenTransaction();
  }

}
