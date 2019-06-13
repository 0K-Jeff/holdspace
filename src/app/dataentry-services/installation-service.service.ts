import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallationServiceService {

  constructor() { }

  chosenInstallation: InstallationFullItem [];
  chosenTenants: [];
  chosenRecyleTypes: [];
  dataCallID;
  instID;
  userID;
  userROLE;

  SetChosenInstallation(dcID, instID, userID, userRole, chosenTenants) {
    this.dataCallID = dcID;
    this.instID = instID;
    this.userID = userID;
    this.userROLE = userRole;
    this.chosenTenants = chosenTenants;
  }

  FetchChosenInstallation() {
    return this.chosenInstallation;
    // make REST call to pull in full installation info.
  }

  ClearChosenInstallation() {
    // This may be unnecessary
    this.chosenInstallation = undefined;
  }

}

// Implement and export the installation detail interface
export interface InstallationListItem {
  instID: number;
  dcStatus: string;
  ffId: string;
  instName: string;
  lastUpdated: Date;
  fullName: string;
}

export interface InstallationFullItem {
  instID: number;
  dcStatus: string;
  ffId: string;
  instName: string;
  lastUpdated: Date;
  fullName: string;
}
