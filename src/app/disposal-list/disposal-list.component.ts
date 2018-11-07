import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface DisposalTransactionListItem {
  date: Date;
  facility: string;
  state: string;
}

// Dummy data - TODO replace with fetch methods using REST API

const dataTransactionPacket = '{ "serverPacket" : [' +
'{"dateString" : "2018-11-25" , "facility" : "fort belvoir" , "state" : "Installation Work"},' +
'{"dateString" : "2015-03-25" , "facility" : "fort belvoir" , "state" : "Installation Work"} ]}';

const dataBundle = JSON.parse(dataTransactionPacket);

const TRANSACTION_DATA: DisposalTransactionListItem[] = [
  {date: new Date (dataBundle.serverPacket[0].dateString), facility: dataBundle.serverPacket[0].facility, state: dataBundle.serverPacket[0].state},
  {date: new Date ('2014-03-25'), facility: 'fort knox', state: 'HQ Review'},
  {date: new Date ('2013-03-25'), facility: 'fort knox', state: 'Installation Return'},
  {date: new Date ('2015-04-25'), facility: 'fort belvoir', state: 'HQ Work'},
  {date: new Date ('2015-05-25'), facility: 'fort belvoir', state: 'Installation Work'},
  {date: new Date ('2015-03-26'), facility: 'fort knox', state: 'HQ Review'},
  {date: new Date ('2015-03-27'), facility: 'fort knox', state: 'HQ Review'},
  {date: new Date ('2016-01-25'), facility: 'fort belvoir', state: 'HQ Work'},
  {date: new Date ('2012-09-25'), facility: 'fort belvoir', state: 'Installation Return'},
  {date: new Date ('2017-04-22'), facility: 'fort knox', state: 'Installation Work'},
  {date: new Date ('2018-10-01'), facility: 'fort knox', state: 'Installation Return'},
  {date: new Date ('2015-09-20'), facility: 'fort belvoir', state: 'HQ Work'},
];

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DisposalListComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'date', 'facility', 'state'];
  dataSource = new MatTableDataSource<DisposalTransactionListItem>(TRANSACTION_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // function disposalListArrayGenerator(translatedServerPacket: Object) {
    //   const currentListPacket[];
    //   for (let x = 0; x < translatedServerPacket.serverPacket.length(); x++) {
    //     const transactionItem = {date: '', facility: '', state: ''};
    //     currentListPacket.push(transactionItem);
    //   }
    //   return currentListPacket;
    // }

    // currentListPacket = disposalListArrayGenerator(dataTransactionPacket);

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
