import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RESTClient } from '../../json-client.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { InstallationListItem, InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';

let INSTALLATION_DATA: InstallationListItem[] = [];

@Component({
  selector: 'app-installation-picker',
  templateUrl: './installation-picker.component.html',
  styleUrls: ['./installation-picker.component.css']
})
export class InstallationPickerComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'instId', 'dcStatus', 'instName'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private installationService: InstallationServiceService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
    this.renderTableData = this.renderTableData.bind(this);
    this.restClient.getInstallationInfoTable(this.renderTableData);
  }

  renderTableData(dataSet) {
    // Clear Table for re-render
    INSTALLATION_DATA = [];
    // translate data into Table
    const JSONpacket = dataSet;
    for (let i = 0; i < JSONpacket.length; i++) {
      // iterate through each entry for installation info
      const arrayInst = {
        instID: JSONpacket[i].instID,
        dcStatus: JSONpacket[i].dcStatus,
        ffId: JSONpacket[i].ffId,
        instName: JSONpacket[i].instName,
        lastUpdated: JSONpacket[i].lastUpdated,
        fullName: JSONpacket[i].fullName
      };
      INSTALLATION_DATA.push(arrayInst);
    }
    this.dataSource = new MatTableDataSource(INSTALLATION_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setChosenBase(instData) {
    // return this.installationService.SetChosenInstallation(instData);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
