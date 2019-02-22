import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { RecyclingTransactionService, RecyclingTransactionListItem } from '../../dataentry-services/recycling-transaction.service';
import { Router } from '@angular/router';

let TRANSACTION_DATA: RecyclingTransactionListItem[] = [];

@Component({
  selector: 'app-recycle-list',
  templateUrl: './recycle-list.component.html',
  styleUrls: ['./recycle-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecycleListComponent implements OnInit {
  // TODO update with correct display values as needed
  displayedColumns: string[] = ['actions', 'date', 'facility', 'recyclingType', 'weight', 'unitCost', 'totalCost'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private recyclingTransactionService: RecyclingTransactionService,
              private router: Router) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<RecyclingTransactionListItem>(this.tableRenderPacket());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  tableRenderPacket() {
    // TODO apply a render method off Rest call

    TRANSACTION_DATA = [];
    // TODO Add things

    return TRANSACTION_DATA;
  }

  SetChosenTransaction(dataBundle): void {
    // transform tons back into pounds where appropriate
    if (dataBundle.isTons === 'pounds') {
      dataBundle.weight = dataBundle.weight * 2000;
    }
    this.recyclingTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void {
    this.recyclingTransactionService.DeleteTransaction(eventTarget);
    this.dataSource = new MatTableDataSource<RecyclingTransactionListItem>(this.tableRenderPacket());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
