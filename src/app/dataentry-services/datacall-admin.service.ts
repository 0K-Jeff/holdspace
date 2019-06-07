import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCallAdminService {

  constructor() { }

  chosenDataCall: DataCallListItem [];

  SetChosenDataCall(eventDataCall) {
    this.chosenDataCall = eventDataCall;
  }

  FetchChosenDataCall() {
    return this.chosenDataCall;
  }

  ClearChosenDataCall() {
    this.chosenDataCall = undefined;
  }

}

// implement and export datacall detail interface
export interface DataCallListItem {
  ID: number;
  serviceId: NumberConstructor;
  dataStartDate: Date;
  dataEndDate: Date;
  collectionStartDate: Date;
  collectionEndDate: Date;
  approveCode: string;
  title: string;
  fydt: number;
  halfFy: number;
  quarterFy: number;
  typeCode: string;
  userId: number;
  lastUpdated: Date;
}
