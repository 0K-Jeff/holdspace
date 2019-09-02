import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecyclingTransactionService {

  constructor() { }

  chosenTransaction: RecyclingTransactionListItem [];

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

// implements and exports disposal tranasaction interface
export interface RecyclingTransactionListItem {
  instId: number;
  rswCalDtZz: string;
  dcId: number;
  tenantId: number;
  tenant: string;
  orgId: number;
  recTypeCode: number;
  recTypeName: string;
  recCatCode: number;
  recCatName: string;
  rswWt: number;
  origRswWt: number;
  splitPct: number;
  rswRevAm: number;
  infoSource: string;
  rswDrmoCode: number;
  isCost: number;
  rswLocUseTx: string;
  volConvRate: number;
  volConvUnit: string;
  userId: number;
  invoiceNumber: string;
  splitActWt: number;
  isQrp: number;
  cdFundCode: string;
}
