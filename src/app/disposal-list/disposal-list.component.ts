import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DisposalTransactionService, DisposalTransactionListItem } from '../disposal-transaction.service';


let TRANSACTION_DATA: DisposalTransactionListItem[] = [];

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DisposalListComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'date', 'facility', 'facilityType', 'totalCost'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private disposalTransactionService: DisposalTransactionService) {

  }

  ngOnInit() {
    // Clear Table of Data to Refresh
    TRANSACTION_DATA = [];

    const dataTransactionPacket = sessionStorage.mockData;
    // translate mock data into JSON TODOREPLACE
    const dataBundle = JSON.parse(dataTransactionPacket);
    console.log(dataBundle);

    for (let iterated = 0; iterated < dataBundle.serverPacket.length; iterated++) {
      const arraySlot = {date: new Date(dataBundle.serverPacket[iterated].dateString), facility: dataBundle.serverPacket[iterated].facility,
      facilityType: dataBundle.serverPacket[iterated].facilityType, totalCost: dataBundle.serverPacket[iterated].totalCost};

      TRANSACTION_DATA.push(arraySlot);
    }
    this.dataSource = new MatTableDataSource<DisposalTransactionListItem>(TRANSACTION_DATA);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  SetChosenTransaction(eventTarget): void {
    this.disposalTransactionService.SetChosenTransaction(eventTarget);
  }

}
