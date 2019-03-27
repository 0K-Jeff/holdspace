import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Enumerate target URLS for making REST calls
const userInfoTableURL = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class JSONClientService {

  constructor() { }

  getUserInfoTable() {

    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', userInfoTableURL + 'users/', false);
    httpClient.send();

    return httpClient.responseText;
  }

  getUserInfo(userID) {
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', userInfoTableURL + 'userroles/' + userID, false);
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

}
