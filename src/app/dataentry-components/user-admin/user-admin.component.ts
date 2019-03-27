import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAdminService, UserListItem } from '../../dataentry-services/user-admin.service';
import { Router } from '@angular/router';
import { JSONClientService } from '../../json-client.service';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';


// create variables to store data if necessary for editing users
let ROLE_DATA = [];
let uFirstName: string;
let uLastName: string;
let uID: string;
let uEmail: string;
let uPhone: string;
let uInstallation: string[];
let editMode = false;

@Component({
  selector: 'app-user-admin',
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
  ],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})

export class UserAdminComponent implements OnInit {
  displayedColumns: string[] = ['role', 'write', 'submit', 'actions'];
  roleDataSource;
  form: FormGroup;

  // enable singleton services and other controllers
  constructor(private userAdminService: UserAdminService,
              private formBuilder: FormBuilder,
              private jsonClientService: JSONClientService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userID: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      installation: ['', Validators.required]
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
      this.form.patchValue({firstName: uFirstName, lastName: uLastName, userID: uID,
      email: uEmail, phone: uPhone, installation: uInstallation});

      // perform additional call for user's role list
      this.roleDataSource = new MatTableDataSource(this.getRolePacket(currentUserData.ID));
    } else {
      // If there isn't an active user, ensure component is set to create new
      editMode = false;
      // clear and replace role data
      ROLE_DATA = [{role: 'N/A', write: 'N/A', submit: 'N/A'}];
      this.roleDataSource = ROLE_DATA;
    }
  }

  getRolePacket(idValue) {
    // clear table to re-render
    ROLE_DATA = [];
    // import and translate the data
    const dataPacket = JSON.parse(this.jsonClientService.getUserInfo(idValue));
    for (let iter = 0; iter < dataPacket.length; iter++) {
      const roleData = {role: dataPacket[iter].userRoleCode, write: dataPacket[iter].canWriteCode, submit: dataPacket[iter].canSubmitCode};
      ROLE_DATA.push(roleData);
    }
    console.log(ROLE_DATA);
    return ROLE_DATA;
  }

  // Submit Button method
  SaveSubmit() {

    if (editMode === true) {
      return undefined;
    } else {
      return undefined;
    }
  }

  // clear chosen user data to avoid side effects
  ClearChosenUser() {
    this.userAdminService.ClearChosenUser();
  }

}
