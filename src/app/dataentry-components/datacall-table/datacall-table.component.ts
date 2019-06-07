import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataCallAdminService, DataCallListItem } from '../../dataentry-services/datacall-admin.service';
import { RESTClient } from '../../json-client.service';
import { Router } from '@angular/router';

let DATACALL_DATA: DataCallListItem[] = [];

@Component({
  selector: 'app-datacall-table',
  templateUrl: './datacall-table.component.html',
  styleUrls: ['./datacall-table.component.css']
})

export class DataCallTableComponent implements OnInit {
  // establish displayed columns
  displayedColumns: string[] = ['actions', 'title', 'ID', 'serviceId', 'typeCode', 'FY', 'dataStartDate', 'dataEndDate'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private datacallAdminService: DataCallAdminService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
      // Bind method to pass on
    this.renderTableData = this.renderTableData.bind(this);

    this.restClient.getDataCallInfoTable(this.renderTableData);
  }

  renderTableData(dataSet) {
        // Clear Table for re-render
        DATACALL_DATA = [];
        // Translate data into Table
        const JSONpacket = dataSet;
        for (let iter = 0; iter < JSONpacket.length; iter++) {
          // translate deactivatedDate into short string for readability
          let startDate = null;
          if (JSONpacket[iter].dataStartDate) {
            startDate = new Date(JSONpacket[iter].dataStartDate);
            startDate = startDate.toLocaleDateString();
          }
          let endDate = null;
          if (JSONpacket[iter].dataEndDate) {
            endDate = new Date(JSONpacket[iter].dataEndDate);
            endDate = endDate.toLocaleDateString();
          }
          let collStartDate = null;
          if (JSONpacket[iter].collectionStartDate) {
            collStartDate = new Date(JSONpacket[iter].collectionStartDate);
            collStartDate = collStartDate.toLocaleDateString();
          }
          let collEndDate = null;
          if (JSONpacket[iter].collectionEndDate) {
            collEndDate = new Date(JSONpacket[iter].collectionEndDate);
            collEndDate = collEndDate.toLocaleDateString();
          }
          let lastUpdate = null;
          if (JSONpacket[iter].lastUpdated) {
            lastUpdate = new Date(JSONpacket[iter].lastUpdated);
            lastUpdate = lastUpdate.toLocaleDateString();
          }
          // iterate through each entry to create user sub-array

          // Example DataCall json record

          // {"dcId":1,"serviceId":1,"moduleCode":"SW","dataStartDate":"1998-10-01T00:00:00.000+0000",
          // "dataEndDate":"1999-09-30T00:00:00.000+0000","collectionStartDate":null,"collectionEndDate":null,
          // "approvedCode":"N","title":"FY 1999","fiscalYear":1999,"halfFiscalYear":null,"quarterCode":null,
          // "typeCode":"A","userId":0,"lastUpdated":"2002-12-12T12:57:54.000+0000"}

           const arrayDataCall = {
             ID: JSONpacket[iter].dcId,
             serviceId: JSONpacket[iter].serviceId,
             typeCode: JSONpacket[iter].typeCode,
             dataStartDate: startDate,
             dataEndDate: endDate,
             collectionStartDate: JSONpacket[iter].collectionStartDate,
             collectionEndDate: JSONpacket[iter].collectionEndDate,
             approveCode: JSONpacket[iter].approveCode,
             title: JSONpacket[iter].title,
             fydt: JSONpacket[iter].fiscalYear,
             halfFy: JSONpacket[iter].halfFiscalYear,
             quarterFy: JSONpacket[iter].quarterCode,
             userId: JSONpacket[iter].userId,
             lastUpdated: lastUpdate
            };

           // push into table after creating array item
           DATACALL_DATA.push(arrayDataCall);
        }
        this.dataSource = new MatTableDataSource(DATACALL_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  SetChosenUser(datacallData) {
    return this.datacallAdminService.SetChosenDataCall(datacallData);
  }

  DisableDataCall(datacall) {
    // toggle the delete icon to ensure user wants to de-activate a user
    const targetedElement = document.getElementById('disableDataCall' + datacall.ID);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.deactivateDataCall(datacall.ID, this.renderTableData);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }
  }
  EnableDataCall(datacall) {
    // toggle the Activate icon to ensure user wants to unarchive datacall
    const targetedElement = document.getElementById('enableDataCall' + datacall.ID);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.activateDataCall(datacall.ID, this.renderTableData);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }


}
