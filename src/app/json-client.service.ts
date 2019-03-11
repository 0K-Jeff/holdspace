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

    // TODO revisit this if necessary and enable observable behavior.
    // const serverJSON = this.http.get(userInfoTableURL);
    // console.log(serverJSON);
    // const serverString = JSON.stringify(serverJSON);
    // console.log(serverString);
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', userInfoTableURL);
    httpClient.setRequestHeader('AKOID' , 'jeffrey.a.kolodner');
    httpClient.send();
    httpClient.onreadystatechange = (e) => {
      console.log(httpClient.responseText);
    };

    return httpClient.responseText;
  }

  getUserInfo(userID) {
    return this.http.get(userInfoTableURL + userID);
  }

}
