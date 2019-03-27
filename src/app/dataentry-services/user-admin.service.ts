import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  constructor() { }

  chosenUser: UserListItem [];

  SetChosenUser(eventUser) {
    this.chosenUser = eventUser;
  }

  FetchChosenUser() {
    return this.chosenUser;
  }

  ClearChosenUser() {
    this.chosenUser = undefined;
  }

}

// implement and export user detail interface
export interface UserListItem {
  firstName: string;
  lastName: string;
  ID: number;
  phone: string;
  email: string;
  installationName: number;
  userName: string;
}
