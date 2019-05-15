import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DisposalTransactionService, DisposalTransactionListItem, BackEndDataPattern } from '../../dataentry-services/disposal-transaction.service';
import { Router } from '@angular/router';
import { RESTClient } from 'src/app/json-client.service';

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css']
})

export class DisposalListComponent implements OnInit {
  // TODO update with correct display values
  displayedColumns: string[] = ['actions', 'date', 'facility', 'facilityType', 'weight', 'unitCost', 'totalCost'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private disposalTransactionService: DisposalTransactionService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
    this.tableRenderPacket = this.tableRenderPacket.bind(this);
    this.restClient.getDisposalTransactionList(115, 105, this.tableRenderPacket);

  }

  tableRenderPacket(dataTransactionPacket) {
    // translate mock data into JSON TODO REPLACE with translating server data
    const dataBundle = JSON.parse(dataTransactionPacket);
    console.log(dataBundle);
    // render complete table
     this.dataSource = new MatTableDataSource(dataBundle);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  SetChosenTransaction(dataBundle): void {
    // transform tons back into pounds where appropriate
    if (dataBundle.isTons === 'pounds') {
      dataBundle.weight = dataBundle.weight * 2000;
    }
    this.disposalTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void {
    // TODOURGENT replace
  }

}
