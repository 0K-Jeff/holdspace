import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAdminService } from '../../dataentry-services/user-admin.service';
import { Router } from '@angular/router';
import { RESTClient } from '../../json-client.service';
import { MatTableDataSource } from '@angular/material';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';

let ROLE_DATA = [];


@Component({
  selector: 'app-user-role-picker',
  templateUrl: './user-role-picker.component.html',
  styleUrls: ['./user-role-picker.component.css']
})
export class UserRolePickerComponent implements OnInit {
  displayedColumns: string[] = ['orgId', 'role', 'write', 'submit', 'actions'];
  roleDataSource;

  constructor(private userAdminService: UserAdminService,
              private formBuilder: FormBuilder,
              private restClient: RESTClient,
              private router: Router,
              private installService: InstallationServiceService,
              ) { }

  ngOnInit() {
     // bind passed methods
     this.renderRoleTable = this.renderRoleTable.bind(this);
     this.updateView = this.updateView.bind(this);
    const cV = this.installService.FetchChosenInstallation();
     // perform additional call for user's role list
     this.restClient.getUserRole(cV.userId, this.renderRoleTable);
  }

    // render method for role table
    renderRoleTable(dataPacket) {
      // clear table for render
      ROLE_DATA = [];
      // iterate through roles
      for (let iter = 0; iter < dataPacket.length; iter++) {
        const roleData = {orgId: dataPacket[iter].orgId, role: dataPacket[iter].userRoleCode,
          write: dataPacket[iter].canWriteCode, submit: dataPacket[iter].canSubmitCode};
        ROLE_DATA.push(roleData);
      }
      // render
      this.roleDataSource = new MatTableDataSource(ROLE_DATA);
    }

  selectRole(roleID) {
    const targetElement = document.getElementById('setRole' + roleID.orgId + ';' + roleID.role);
    if (targetElement.classList.contains('doubleCheck') === true ) {
    const cV = this.installService.FetchChosenInstallation();
    const newValue: string = roleID.orgId + ';' + roleID.role;
    this.installService.SetChosenInstallation(cV.dcId, cV.instId, cV.userId, newValue, cV.tenantList);
    this.restClient.updateIniRole(cV.userId, newValue, this.updateView);
    } else {
      targetElement.classList.toggle('doubleCheck');
    }
  }

  updateView(elementID) {
    // handle class changes to indicate completed update.
    const targetElement = document.getElementById('setRole' + elementID);
    targetElement.classList.toggle('doubleCheck');
  }


}
