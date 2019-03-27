import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';

// Enumerate target URLS for making REST calls
const rootURL = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class JSONClientService {

  constructor() { }

  // GET requests
  getUserInfoTable() {

    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'users/', false);
    httpClient.send();
    return httpClient.responseText;
  }

  getUserInfo(userID) {
    // fetch User Roles
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'userroles/' + userID, false);
    httpClient.onreadystatechange = function() {
      if (this.status === 404) {
        itemValue = '[{"userRoleCode": "N/A", "canWriteCode": "N/A", "canSubmitCode": "N/A"}]';
      } else if (this.status === 200) {
        itemValue = httpClient.responseText;
      }
    };
    httpClient.send();
    return itemValue;
  }

  // POST requests

  createUser(infostring) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'users/', false);
    httpClient.send(infostring);
  }

  updateRole(infoString) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'userroles/', false);
    httpClient.send(infoString);
  }

  // PUT requests

  updateUser(infostring, userID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('PUT', rootURL + 'users/' + userID, false);
    httpClient.send(infostring);
  }

  // DELETE requests

  deactivateUser(userID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'users/' + userID, false);
    httpClient.send();
  }

  deleteRole(infoString) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'userroles/', false);
    httpClient.send(infoString);
  }

}
