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

  DeleteTransaction(transactionRef) {
    // TODO apply actual delete Method with REST calls
  }

}

// implements and exports disposal tranasaction interface
export interface RecyclingTransactionListItem {
  transactionId: string;
  date: Date;
  isActualWeight: string;
  isRevenue: string;
  isTons: string;
  weight: number;
  comments: string;
  unitCost: number;
  facility: string;
  facilityType: string;
  recyclingType: string;
  totalCost: number;
}
