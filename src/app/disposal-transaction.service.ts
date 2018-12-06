import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DisposalTransactionService {

  constructor() {

   }

   chosenTransaction: DisposalTransactionListItem [];

   SetChosenTransaction(eventTransaction) {
    this.chosenTransaction = eventTransaction;
   }

   FetchChosenTransaction() {
     return this.chosenTransaction;
   }

   ClearChosenTransaction() {
      this.chosenTransaction = undefined;
   }

}

export interface DisposalTransactionListItem {
  date: Date;
  facility: string;
  facilityType: string;
  totalCost: number;
}
