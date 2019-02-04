import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DisposalTransactionService, DisposalTransactionListItem } from '../../dataentry-services/disposal-transaction.service';
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

    this.dataSource = new MatTableDataSource<DisposalTransactionListItem>(this.tableRenderPacket());

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  tableRenderPacket() {
    // Clear Table of Data to Refresh
    TRANSACTION_DATA = [];

    const dataTransactionPacket = sessionStorage.mockData;
    // translate mock data into JSON TODO REPLACE with translating server data
    const dataBundle = JSON.parse(dataTransactionPacket);
    console.log(dataBundle);

    for (let iterated = 0; iterated < dataBundle.serverPacket.length; iterated++) {
      // generate tons from pounds weight value
      let currentWeightValue = dataBundle.serverPacket[iterated].weight;
      if (dataBundle.serverPacket[iterated].isTons === 'pounds') {
        currentWeightValue = currentWeightValue * 0.0005;
      }
      // iterates through list items and translates data into the table view
      const arraySlot = {transactionId: dataBundle.serverPacket[iterated].transactionId, date: new Date(dataBundle.serverPacket[iterated].date),
      isActualWeight: dataBundle.serverPacket[iterated].isActualWeight, facility: dataBundle.serverPacket[iterated].facility,
      facilityType: dataBundle.serverPacket[iterated].facilityType, totalCost: dataBundle.serverPacket[iterated].totalCost,
      isRevenue: dataBundle.serverPacket[iterated].isRevenue, weight: currentWeightValue,
      isTons: dataBundle.serverPacket[iterated].isTons, unitCost: dataBundle.serverPacket[iterated].unitCost};

      // pushes data into the table after creating array item
      TRANSACTION_DATA.push(arraySlot);
     }
     return TRANSACTION_DATA;
  }

  SetChosenTransaction(dataBundle): void {
    // transform tons back into pounds where appropriate
    if (dataBundle.isTons === 'pounds') {
      dataBundle.weight = dataBundle.weight * 2000;
    }
    this.disposalTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void {
    this.disposalTransactionService.DeleteTransaction(eventTarget);

    this.dataSource = new MatTableDataSource<DisposalTransactionListItem>(this.tableRenderPacket());

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
