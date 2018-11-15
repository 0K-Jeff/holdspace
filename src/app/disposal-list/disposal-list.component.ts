import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface DisposalTransactionListItem {
  date: Date;
  facility: string;
  facilityType: string;
  totalCost: number;
}

// Dummy data - TODO replace with fetch methods using REST API

const dataTransactionPacket = '{ "serverPacket" : [' +
'{"dateString" : "2016-10-26" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "50.07"},' +
'{"dateString" : "2016-10-25" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "40.07"},' +
'{"dateString" : "2017-07-05" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "230.07"},' +
'{"dateString" : "2018-01-15" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "1111.07"},' +
'{"dateString" : "2018-05-23" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "40.47"},' +
'{"dateString" : "2015-04-25" , "facility" : "Camp Swampy incinerator" , "facilityType" : "W" , "totalCost" : "423.07"},' +
'{"dateString" : "2015-03-15" , "facility" : "Trashbegone landfill and disposal" , "facilityType" : "D" , "totalCost" : "300.57"} ]}';

const dataBundle = JSON.parse(dataTransactionPacket);

// tslint:disable-next-line:prefer-const
let TRANSACTION_DATA: DisposalTransactionListItem[] = [];

for (let iterated = 0; iterated < dataBundle.serverPacket.length; iterated++) {
  const arraySlot = {date: new Date(dataBundle.serverPacket[iterated].dateString), facility: dataBundle.serverPacket[iterated].facility,
    facilityType: dataBundle.serverPacket[iterated].facilityType, totalCost: dataBundle.serverPacket[iterated].totalCost};

    TRANSACTION_DATA.push(arraySlot);
}

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DisposalListComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'date', 'facility', 'facilityType', 'totalCost'];
  dataSource = new MatTableDataSource<DisposalTransactionListItem>(TRANSACTION_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
