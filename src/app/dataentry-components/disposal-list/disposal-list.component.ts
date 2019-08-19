import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DisposalTransactionService } from '../../dataentry-services/disposal-transaction.service';
import { Router } from '@angular/router';
import { RESTClient } from 'src/app/json-client.service';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';

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
              private router: Router,
              private installationService: InstallationServiceService) { }

  ngOnInit() {
    this.tableRenderPacket = this.tableRenderPacket.bind(this);
    const instData = this.installationService.FetchChosenInstallation();
    this.restClient.getDisposalTransactionList(instData.instId, instData.dcId, this.tableRenderPacket);
  }

  tableRenderPacket(dataTransactionPacket) {
    // parse data input
    const dataBundle = JSON.parse(dataTransactionPacket);
    const facList = this.installationService.FetchFacilities();
    console.log(dataBundle);
    for (let i = 0; i < dataBundle.length; i++) {
      for (let ix = 0; ix < facList.length; ix++) {
        if (dataBundle[i].facId === facList[ix].facId) {
          dataBundle[i].facNameT = facList[ix].facName;
        }
      }
    }
    // render complete table
     this.dataSource = new MatTableDataSource(dataBundle);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  SetChosenTransaction(dataBundle): void {
    this.disposalTransactionService.SetChosenTransaction(dataBundle);
  }

  DeleteTransaction(eventTarget): void {
    const targetedElement = document.getElementById('deleteTransaction' + eventTarget.sldWstCDTM);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.deleteDisposalTransaction(eventTarget, this.tableRenderPacket);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }
  }

}
