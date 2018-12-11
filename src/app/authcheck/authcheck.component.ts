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
    '{"dateString" : "2016-10-26" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "50.07"},' +
    '{"dateString" : "2016-10-25" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "40.07"},' +
    '{"dateString" : "2017-07-05" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "230.07"},' +
    '{"dateString" : "2018-01-15" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "1111.07"},' +
    '{"dateString" : "2018-05-23" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "40.47"},' +
    '{"dateString" : "2015-04-25" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "423.07"},' +
    '{"dateString" : "2015-03-15" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "300.57"} ]}';
    }
  }

}
