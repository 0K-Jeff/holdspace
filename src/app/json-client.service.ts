import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';

// Enumerate target URLS for making REST calls
const rootURL = 'http://localhost:3000/api/'; // Node.js Service
// const rootURL = 'http://localhost:8181/swar/rest/';  // Tomcat

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
       itemValue = '[{"userId":7473,"orgId": "N/A","orgName":"ARMY","userRoleCode": "N/A", "canWriteCode": "N/A", "canSubmitCode": "N/A"}]';
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
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infostring);
  }

  updateRole(infoString) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'userroles/', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infoString);
  }

  updateUser(infostring, userID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'users/' + userID, false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infostring);
  }

  activateUser(userID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'users/activate/' + userID, false);
    httpClient.setRequestHeader('Content-Type', 'application/json');
    httpClient.send();
  }


  // DELETE requests

  deactivateUser(userID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'users/' + userID, false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send();
  }

  deleteRole(infoString) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'userroles/', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infoString);
  }

}
