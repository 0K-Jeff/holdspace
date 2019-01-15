import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DisposalTransactionService, DisposalTransactionListItem } from '../disposal-transaction.service';
import { Router } from '@angular/router';

let TRANSACTION_DATA: DisposalTransactionListItem[] = [];

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DisposalListComponent implements OnInit {
  // TODO update with correct display values
  displayedColumns: string[] = ['actions', 'date', 'facility', 'facilityType', 'weight', 'unitCost', 'totalCost'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private disposalTransactionService: DisposalTransactionService,
              private router: Router) { }

  ngOnInit() {
    // Clear Table of Data to Refresh
    TRANSACTION_DATA = [];

    const dataTransactionPacket = sessionStorage.mockData;
    // translate mock data into JSON TODO REPLACE with translating server data
    const dataBundle = JSON.parse(dataTransactionPacket);
    console.log(dataBundle);

    for (let iterated = 0; iterated < dataBundle.serverPacket.length; iterated++) {
      // iterates through list items and translates data into the table view
      const arraySlot = {transactionId: dataBundle.serverPacket[iterated].transactionId, date: new Date(dataBundle.serverPacket[iterated].date),
      isActualWeight: dataBundle.serverPacket[iterated].isActualWeight, facility: dataBundle.serverPacket[iterated].facility,
      facilityType: dataBundle.serverPacket[iterated].facilityType, totalCost: dataBundle.serverPacket[iterated].totalCost,
      isRevenue: dataBundle.serverPacket[iterated].isRevenue, weight: dataBundle.serverPacket[iterated].weight,
      isTons: dataBundle.serverPacket[iterated].isTons, unitCost: dataBundle.serverPacket[iterated].unitCost};

      // pushes data into the table after creating array item
      TRANSACTION_DATA.push(arraySlot);
    }
    this.dataSource = new MatTableDataSource<DisposalTransactionListItem>(TRANSACTION_DATA);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  SetChosenTransaction(dataBundle): void {
    this.disposalTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void {
    this.disposalTransactionService.DeleteTransaction(eventTarget);

    // Repeat load process now that item is deleted TODO replace with proper REST behavior
    TRANSACTION_DATA = [];
    const dataTransactionPacket = sessionStorage.mockData;
    // translate mock data into JSON TODO REPLACE with translating server data
    const dataBundle = JSON.parse(dataTransactionPacket);
    console.log(dataBundle);
    for (let iterated = 0; iterated < dataBundle.serverPacket.length; iterated++) {
      // iterates through list items and translates data into the table view
      const arraySlot = {transactionId: dataBundle.serverPacket[iterated].transactionId, date: new Date(dataBundle.serverPacket[iterated].date),
      isActualWeight: dataBundle.serverPacket[iterated].isActualWeight, facility: dataBundle.serverPacket[iterated].facility,
      facilityType: dataBundle.serverPacket[iterated].facilityType, totalCost: dataBundle.serverPacket[iterated].totalCost,
      isRevenue: dataBundle.serverPacket[iterated].isRevenue, weight: dataBundle.serverPacket[iterated].weight,
      isTons: dataBundle.serverPacket[iterated].isTons, unitCost: dataBundle.serverPacket[iterated].unitCost};

      // pushes data into the table after creating array item
      TRANSACTION_DATA.push(arraySlot);
    }
    this.dataSource = new MatTableDataSource<DisposalTransactionListItem>(TRANSACTION_DATA);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
