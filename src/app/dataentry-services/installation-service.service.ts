import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallationServiceService {

  constructor() { }

  chosenInstallation: InstallationFullItem [];
  chosenTenants: [];
  recyleTypes: [];
  dataCallID;
  instID;
  userID;
  userROLE;
  facilityList;

  SetChosenInstallation(dcID, instID, userID, userRole, chosenTenants) {
    // stores session data
    this.dataCallID = dcID;
    this.instID = instID;
    this.userID = userID;
    this.userROLE = userRole;
    this.chosenTenants = chosenTenants;
    const collatedValues = {
      dcId: this.dataCallID,
      instId: this.instID,
      userId: this.userID,
      userRole: this.userROLE,
      tenantList: this.chosenTenants
    };
    console.log(collatedValues);
  }

  SetRecyclingTypes(recyclingInfo) {
    // stores recycling types
    this.recyleTypes = recyclingInfo;
  }

  SetFacilities(facilityInfo) {
    this.facilityList = facilityInfo;
  }

  FetchChosenInstallation() {
    // Returns an array with the global values
    const collatedValues = {
      dcId: this.dataCallID,
      instId: this.instID,
      userId: this.userID,
      userRole: this.userROLE,
      tenantList: this.chosenTenants
    };
    return collatedValues;
  }

  FetchRecyclingTypes() {
    // return recycling type list
    return this.recyleTypes;
  }

  FetchFacilities() {
    return this.facilityList;
  }

  ClearChosenInstallation() {
    // This may be unnecessary
    this.chosenInstallation = undefined;
  }

}

// Implement and export the installation detail interface
export interface InstallationListItem {
  instId: number;
  dcStatus: string;
  ffId: string;
  instName: string;
  lastUpdated: Date;
  fullName: string;
}

export interface InstallationFullItem {
  instId: number;
  dcStatus: string;
  ffId: string;
  instName: string;
  lastUpdated: Date;
  fullName: string;
}
