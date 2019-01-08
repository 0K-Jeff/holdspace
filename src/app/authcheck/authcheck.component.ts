import { Component, OnInit } from '@angular/core';
import { SessionStoreAPI } from '../sessionStoreAPI';

@Component({
  selector: 'app-authcheck',
  templateUrl: './authcheck.component.html',
  styleUrls: ['./authcheck.component.css']
})

export class AuthcheckComponent implements OnInit {
  visititem: SessionStoreAPI = {
    ticker: sessionStorage.visitcount
  };

  constructor() { }

  ngOnInit() {
    // Dummy data - TODO replace with fetch methods using REST API

    if (sessionStorage.mockData) {
      return;
    } else {
      sessionStorage.mockData = '{ "serverPacket" : [' +
    // tslint:disable-next-line:max-line-length
    '{"transactionId" : "2016-10-26JKOLODNER" , "dateString" : "2016-10-26" , "isActualWeight" : "actual" , "isRevenue" : "cost" , "isTons" : "tons" , "weight" : "21" , "costByWeight" : "4" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "84.00"} ]}';
    }
  }

}
