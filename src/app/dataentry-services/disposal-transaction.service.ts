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

   DeleteTransaction(transactionRef) {
    let arrayStore = sessionStorage.mockData;
    const arrayJSON = JSON.parse(arrayStore);
    for (let iterated = 0; iterated < arrayJSON.serverPacket.length; iterated++) {
      // find and remove transaction by transactionId - TODO replace with appropriate call and move this action to server
      if ( arrayJSON.serverPacket[iterated].transactionId === transactionRef) {
        arrayJSON.serverPacket.splice(iterated, 1);
      }
    }
    arrayStore = JSON.stringify(arrayJSON);
    sessionStorage.mockData = arrayStore;
   }

}

// implements and exports disposal tranasaction interface
export interface DisposalTransactionListItem {
  installationId: number;
  date: Date;
  isActualWeight: string;
  isRevenue: string;
  isTons: string;
  weight: number;
  unitCost: number;
  facility: string;
  facilityType: string;
  totalCost: number;
}

export interface BackEndDataPattern {
  instId: number;
  sldWstCDTM: Date;
  tenantId: number;
  tenant: string;
  dcId: number;
  facId: number;
  wstTypeCode: string;
  orgId: number;
  recTypeCode: string;
  recCatCode: string;
  sldWstWeight: number;
  splitPct: number;
  trnsWstFeeAm: number;
  infoSourceCode: string;
  trnsWstAshCode: number;
  isRevenue: number;
  localUse: string;
  volumeConvRate: number;
  volumeConvUnit: string;
  userId: number;
  invoiceNumber: string;
  mrfDisposalTypeCode: string;
  splitActWeight: number;
  cdFundCode: number;
}
