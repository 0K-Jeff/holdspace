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

  DisableUser(userId) {
    // TODO replace with appropriate API call
    return userId;
  }

}

// implement and export user detail interface
export interface UserListItem {
  firstName: string;
  lastName: string;
  ID: string;
  phone: string;
  email: string;
  installation: string;
}
