import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallationServiceService {

  constructor() { }

  recyclingCats = [{'code': 1, 'name': 'BULKY ITEMS', 'display': 'Y'},
  {'code': 2, 'name': 'C&D DEBRIS', 'display': 'Y'},
  {'code': 3, 'name': 'FOOD', 'display': 'Y'},
  {'code': 4, 'name': 'GLASS', 'display': 'Y'},
  {'code': 5, 'name': 'METALS', 'display': 'Y'},
  {'code': 6, 'name': 'OTHER (NON-FOOD)', 'display': 'Y'},
  {'code': 7, 'name': 'PAPER', 'display': 'Y'},
  {'code': 8, 'name': 'PLASTIC', 'display': 'Y'},
  {'code': 9, 'name': 'RANGE METALS', 'display': 'Y'},
  {'code': 10, 'name': 'OTHER SELECT WASTES', 'display': 'Y'},
  {'code': 11, 'name': 'TEXTILES', 'display': 'Y'},
  {'code': 12, 'name': 'WOOD', 'display': 'Y'},
  {'code': 13, 'name': 'BULBS', 'display': 'Y'},
  {'code': 14, 'name': 'COMPOSTING', 'display': 'Y'}];

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

  FetchRecyclingCat() {
    // return recycling hardcoded List
    return this.recyclingCats;
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
