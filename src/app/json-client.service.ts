import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Enumerate target URLS for making REST calls
const userInfoTableURL = 'http://localhost:3000/api/users/';


@Injectable({
  providedIn: 'root'
})
export class JSONClientService {

  constructor(private http: HttpClient) { }

  getUserInfoTable() {
    const serverJSON = this.http.get(userInfoTableURL);
    const serverString = JSON.stringify(serverJSON);
    return serverString;
  }

  getUserInfo(userID) {
    return this.http.get(userInfoTableURL + userID);
  }

}
