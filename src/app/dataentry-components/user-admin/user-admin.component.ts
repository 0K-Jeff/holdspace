import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAdminService } from '../../dataentry-services/user-admin.service';
import { Router } from '@angular/router';
import { RESTClient } from '../../json-client.service';
import { MatTableDataSource } from '@angular/material';


// create variables to store data if necessary for editing users
let ROLE_DATA = [];
let uFirstName: string;
let uLastName: string;
let uID: string;
let uEmail: string;
let uPhone: string;
let uInstallation: string[];
let uDeactivatedDate: Date;
let uIsDBACode: boolean;
let editMode = false;

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})

export class UserAdminComponent implements OnInit {
  // enumerate columns for role table
  displayedColumns: string[] = ['orgId', 'role', 'write', 'submit', 'actions'];
  roleDataSource;
  form: FormGroup;

  // enable singleton services and other controllers
  constructor(private userAdminService: UserAdminService,
              private formBuilder: FormBuilder,
              private restClient: RESTClient,
              private router: Router,
              ) { }

  ngOnInit() {
    // bind passed methods
    this.renderRoleTable = this.renderRoleTable.bind(this);
    // build form
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      AKOID: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      installation: ['', Validators.required],
      isDBACode: [false],
      deactivatedDate: ['']
    });
    // grab edit mode target if relevant
    const currentUserData: any = this.userAdminService.FetchChosenUser();
    console.log(this.userAdminService.FetchChosenUser());

    // apply the current user info to the form for editing
    if (currentUserData) {
      editMode = true;
      uFirstName = currentUserData.firstName;
      uLastName = currentUserData.lastName;
      uID = currentUserData.userName;
      uEmail = currentUserData.email;
      uPhone = currentUserData.phone;
      uInstallation = currentUserData.installationID;
      uIsDBACode = (function(inputvalue = currentUserData.isDbaCode) {if (inputvalue === 'Y') {
          return true; } else {
          return false; }
        }());
      // ensure no 'default date'
      if (currentUserData.deactivatedDate !== null) {
        uDeactivatedDate = new Date(currentUserData.deactivatedDate);
      } else {
        uDeactivatedDate = null;
      }
      this.form.patchValue({firstName: uFirstName, lastName: uLastName, AKOID: uID,
      email: uEmail, phone: uPhone, installation: uInstallation, deactivatedDate: uDeactivatedDate, isDBACode: uIsDBACode});

      // perform additional call for user's role list
      this.restClient.getUserRole(currentUserData.ID, this.renderRoleTable);
    } else {
      // If there isn't an active user, ensure component is set to create new
      editMode = false;
      // hide role blocks for new user
      const roleblox = document.getElementsByClassName('roleBoxes');
      for (let i = 0; i < roleblox.length; i++) {
        roleblox[i].classList.toggle('invisify');
      }
    }
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

  // Submit Button method
  SaveSubmit() {

    if (editMode === true) {
      const currentUserData: any = this.userAdminService.FetchChosenUser();
      // translate into JSON
      let dbaValue;
      if (this.form.value.isDbaCode === true) {
        dbaValue = 'Y';
      } else {
        dbaValue = 'N';
      }
      const updatePackage = {
        id: currentUserData.ID,
        userName: this.form.value.AKOID,
        middleInitial: null,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        isDbaCode: dbaValue,
        orgId: this.form.value.installation,
        orgName: null,
        deactivatedDate: this.form.value.deactivatedDate
      };
      // Send PUT request and clear user data service
      console.log(updatePackage);
      this.restClient.updateUser(JSON.stringify(updatePackage));
      this.ClearChosenUser();
    } else {
      // translate into JSON
      let dbaValue;
      if (this.form.value.isDbaCode === true) {
        dbaValue = 'Y';
      } else {
        dbaValue = 'N';
      }
      const updatePackage = {
        userName: this.form.value.AKOID,
        middleInitial: '',
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        isDbaCode: dbaValue,
        orgId: this.form.value.installation,
        orgName: null,
        deactivatedDate: this.form.value.deactivatedDate
      };
      // send POST request and clear user data service
      console.log(updatePackage);
      this.restClient.createUser(JSON.stringify(updatePackage));
      this.ClearChosenUser();
    }
    this.router.navigateByUrl('/useradmin');
  }

  // clear chosen user data to avoid side effects
  ClearChosenUser() {
    this.userAdminService.ClearChosenUser();
  }

  // add role

  addRole() {
    const currentUserData: any = this.userAdminService.FetchChosenUser();
    const userInfo = {
      userId: currentUserData.ID,
      orgId: (<HTMLInputElement>document.getElementById('orgIdField')).value,
      userRoleCode: (<HTMLInputElement>document.getElementById('roleField')).value,
      canWriteCode: (<HTMLInputElement>document.getElementById('writeField')).value,
      canSubmitCode: (<HTMLInputElement>document.getElementById('submitField')).value
    };
    console.log(userInfo);
    this.restClient.updateRole(userInfo, this.renderRoleTable);
  }

  // delete role

  deleteRole(roleData) {
    const currentUserData: any = this.userAdminService.FetchChosenUser();
    const deleteInfo = {
      userId: currentUserData.ID,
      orgId: roleData.orgId,
      userRoleCode: roleData.role
    };
    console.log(deleteInfo);
    this.restClient.deleteRole(deleteInfo, this.renderRoleTable);
  }
}
