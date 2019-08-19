import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { RecyclingTransactionService } from '../../dataentry-services/recycling-transaction.service';
import { Router } from '@angular/router';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';
import { RESTClient } from 'src/app/json-client.service';

@Component({
  selector: 'app-recycle-list',
  templateUrl: './recycle-list.component.html',
  styleUrls: ['./recycle-list.component.css']
})
export class RecycleListComponent implements OnInit {
  // TODO update with correct display values as needed
  displayedColumns: string[] = ['actions', 'date', 'recyclingCat', 'recyclingType', 'weight', 'unitCost', 'totalCost'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private recyclingTransactionService: RecyclingTransactionService,
              private installationService: InstallationServiceService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
    this.tableRenderPacket = this.tableRenderPacket.bind(this);
    const instData = this.installationService.FetchChosenInstallation();
    this.restClient.getRecyclingTransactionList(instData.instId, instData.dcId, this.tableRenderPacket);
  }

  tableRenderPacket(dataTransactionPacket) {
    // parse data input
    const dataBundle = JSON.parse(dataTransactionPacket);
    const rCats: any = this.installationService.FetchRecyclingCat();
    const rTypes: any  = this.installationService.FetchRecyclingTypes();
    console.log(dataBundle);
    for (let i = 0; i < dataBundle.length; i++) {
      for (let ix = 0; ix < rCats.length; ix++) {
        if (dataBundle[i].recCatCode === rCats[ix].code) {
          dataBundle[i].recCatName = rCats[ix].name;
          for (let iy = 0; iy < rTypes.length; iy++) {
            if (dataBundle[i].recCatCode === rTypes[iy].recCatCode && dataBundle[i].recTypeCode === rTypes[iy].recTypeCode) {
              dataBundle[i].recTypeName = rTypes[iy].recTypeName;
            }
          }
        }
      }
    }
    // render complete table
     this.dataSource = new MatTableDataSource(dataBundle);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  SetChosenTransaction(dataBundle): void {
    this.recyclingTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void { // replace with recycle based options
    const targetedElement = document.getElementById('deleteTransaction' + eventTarget.rswCalDtZz);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.deleteRecycleTransaction(eventTarget, this.tableRenderPacket);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }

  }

}
