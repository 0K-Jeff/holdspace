import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataCallAdminService } from '../../dataentry-services/datacall-admin.service';
import { Router } from '@angular/router';
import { RESTClient } from '../../json-client.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-datacall-admin',
  templateUrl: './datacall-admin.component.html',
  styleUrls: ['./datacall-admin.component.css']
})

export class DataCallAdminComponent implements OnInit {
  // enumerate columns for role table
  displayedColumns: string[] = ['orgId', 'role', 'write', 'submit', 'actions'];
  roleDataSource;
  form: FormGroup;

  // enable singleton services and other controllers
  constructor(private datacallAdminService: DataCallAdminService,
              private formBuilder: FormBuilder,
              private restClient: RESTClient,
              private router: Router,
              ) { }

  ngOnInit() {
  }

  // Submit Button method
  // SaveSubmit() {

  //   if (editMode === true) {
  //     const currentDataCallData: any = this.datacallAdminService.FetchChosenDataCall();
  //     // translate into JSON
  //     let dbaValue;
  //     if (this.form.value.isDbaCode === true) {
  //       dbaValue = 'Y';
  //     } else {
  //       dbaValue = 'N';
  //     }
  //     // {"dcId":1,"serviceId":1,"moduleCode":"SW","dataStartDate":"1998-10-01T00:00:00.000+0000",
  //     // "dataEndDate":"1999-09-30T00:00:00.000+0000","collectionStartDate":null,"collectionEndDate":null,
  //     // "approvedCode":"N","title":"FY 1999","fiscalYear":1999,"halfFiscalYear":null,"quarterCode":null,
  //     // "typeCode":"A","userId":0,"lastUpdated":"2002-12-12T12:57:54.000+0000"}

  //     const updatePackage = {
  //       dcId: currentDataCallData.ID,
  //       serviceId: this.form.value.serviceId,
  //       moduleCode: 'SW',
  //       dataStartDate: this.form.value.startDate,
  //       dataEndDate: this.form.value.endDate,
  //       collectionStartDate: this.form.value.collectionStartDate,
  //       collectionEndDate: this.form.value.collectionEndDate,
  //       approvedCode: this.form.value.approveCode,
  //       title: this.form.value.title,
  //       fiscalYear: this.form.value.fydt,
  //       halfFiscalYear: this.form.value.halfFy,
  //       quarterCode: this.form.value.quarterFy,
  //       typeCode: this.form.value.typeCode,
  //       userId: this.form.value.userId,
  //       lastUpdated: this.form.value.lastUpdated
  //     };

  //     // Send PUT request and clear user data service
  //     console.log(updatePackage);
  //     this.restClient.updateDataCall(JSON.stringify(updatePackage));
  //     this.ClearChosenDataCall();
  //   } else {
  //     // translate into JSON
  //     const updatePackage = {
  //       serviceId: this.form.value.serviceId,
  //       moduleCode: 'SW',
  //       dataStartDate: this.form.value.startDate,
  //       dataEndDate: this.form.value.endDate,
  //       collectionStartDate: this.form.value.collectionStartDate,
  //       collectionEndDate: this.form.value.collectionEndDate,
  //       approvedCode: this.form.value.approveCode,
  //       title: this.form.value.title,
  //       fiscalYear: this.form.value.fydt,
  //       halfFiscalYear: this.form.value.halfFy,
  //       quarterCode: this.form.value.quarterFy,
  //       typeCode: this.form.value.typeCode,
  //       userId: this.form.value.userId,
  //       lastUpdated: this.form.value.lastUpdated
  //     };
  //     // send POST request and clear user data service
  //     console.log(updatePackage);
  //     this.restClient.createUser(JSON.stringify(updatePackage));
  //     this.ClearChosenDataCall();
  //   }
  //   this.router.navigateByUrl('/datacalladmin');
  // }

  // clear chosen user data to avoid side effects
  ClearChosenDataCall() {
    this.datacallAdminService.ClearChosenDataCall();
  }

}
