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

   SaveTransactionEdit(transactionRef, formData) {
    let arrayStore = sessionStorage.mockData;
    const arrayJSON = JSON.parse(arrayStore);
    // TODO update and complete edit Transaction - utilize some form of merge value and write back to JSON - 
    arrayStore = JSON.stringify(arrayJSON);
    sessionStorage.mockData = arrayStore;
   }

   DeleteTransaction(transactionRef) {
    let arrayStore = sessionStorage.mockData;
    const arrayJSON = JSON.parse(arrayStore);
    for (let iterated = 0; iterated < arrayJSON.serverPacket.length; iterated++) {
      // find and remove transaction by transactionId
      if ( arrayJSON.serverPacket[iterated].transactionId === transactionRef) {
        arrayJSON.serverPacket.splice(iterated, 1);
      }
    }
    arrayStore = JSON.stringify(arrayJSON);
    sessionStorage.mockData = arrayStore;
   }

}

export interface DisposalTransactionListItem {
  transactionId: string;
  date: Date;
  isActualWeight: boolean;
  isCost: boolean;
  weight: number;
  isTons: boolean;
  facility: string;
  facilityType: string;
  totalCost: number;
}
