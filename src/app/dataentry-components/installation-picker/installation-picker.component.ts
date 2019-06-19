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
    const cV = this.installationService.FetchChosenInstallation();
    this.restClient.getInstallationInfoTable(cV.dcId, cV.userRole, this.renderTableData);
  }

  renderTableData(dataSet) {
    // Clear Table for re-render
    INSTALLATION_DATA = [];
    // translate data into Table
    const JSONpacket = dataSet;
    for (let i = 0; i < JSONpacket.length; i++) {
      // iterate through each entry for installation info
      const arrayInst = {
        instId: JSONpacket[i].instId,
        dcStatus: JSONpacket[i].dcStatus,
        ffId: JSONpacket[i].ffId,
        instName: JSONpacket[i].instName,
        lastUpdated: JSONpacket[i].lastUpdated,
        fullName: JSONpacket[i].fullName
      };
      INSTALLATION_DATA.push(arrayInst);
    }
    console.log(INSTALLATION_DATA);
    this.dataSource = new MatTableDataSource(INSTALLATION_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SetChosenBase(iData) {
    this.updateFacilities = this.updateFacilities.bind(this);
    const targetElement = document.getElementById('setInst' + iData.instId);
    if (targetElement.classList.contains('doubleCheck') === true ) {
    const cV = this.installationService.FetchChosenInstallation();
    const tenantList = this.restClient.getTenantList(cV.dcId, iData.instId);
    this.restClient.updateIniInstallation(cV.userId, iData.instId, this.updateView);
    this.installationService.SetChosenInstallation(cV.dcId, iData.instId, cV.userId, cV.userRole, tenantList);
    this.restClient.getFacilityList(cV.dcId, iData.instId, this.updateFacilities);
    } else {
      targetElement.classList.toggle('doubleCheck');
    }
  }

  updateFacilities(dataSet) {
    this.installationService.SetFacilities(dataSet);
  }

  updateView(elementID) {
    // handle class changes to indicate completed update. TODO add checkbox for current selection
    const targetElement = document.getElementById('setInst' + elementID);
    targetElement.classList.toggle('doubleCheck');
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
