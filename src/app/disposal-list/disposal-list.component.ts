import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface DisposalTransactionListItem {
  date: string;
  facility: string;
  state: string;
}

// Dummy data - TODO replace with fetch methods using REST API

const TRANSACTION_DATA: DisposalTransactionListItem[] = [
  {date: '10/12/19', facility: 'fort belvoir', state: 'Installation Work'},
  {date: '9/7/12', facility: 'fort knox', state: 'HQ Review'},
  {date: '11/11/11', facility: 'fort knox', state: 'Installation Return'},
  {date: '1/1/11', facility: 'fort belvoir', state: 'HQ Work'},
  {date: '10/12/19', facility: 'fort belvoir', state: 'Installation Work'},
  {date: '9/7/12', facility: 'fort knox', state: 'HQ Review'},
  {date: '11/11/11', facility: 'fort knox', state: 'HQ Review'},
  {date: '1/1/11', facility: 'fort belvoir', state: 'HQ Work'},
  {date: '10/12/19', facility: 'fort belvoir', state: 'Installation Return'},
  {date: '9/7/12', facility: 'fort knox', state: 'Installation Work'},
  {date: '11/11/11', facility: 'fort knox', state: 'Installation Return'},
  {date: '1/1/11', facility: 'fort belvoir', state: 'HQ Work'},
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

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
