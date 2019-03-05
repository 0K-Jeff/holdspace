import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAdminService, UserListItem } from '../dataentry-services/user-admin.service';
import { Router } from '@angular/router';

// create variables to store data if necessary for editing users
let uFirstName: string;
let uLastName: string;
let uID: string;
let uEmail: string;
let uPhone: string;
let uInstallation: string;
let editMode = false;

@Component({
  selector: 'app-authcheck',
  templateUrl: './authcheck.component.html',
  styleUrls: ['./authcheck.component.css']
})

export class AuthcheckComponent implements OnInit {
  form: FormGroup;

  // enable singleton services and other controllers
  constructor(private userAdminService: UserAdminService,
              private formBuilder: FormBuilder,
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

    // apply the current user info to the form for editing
    if (currentUserData) {
      editMode = true;
      uFirstName = currentUserData.firstName;
      uLastName = currentUserData.lastName;
      uID = currentUserData.userID;
      uEmail = currentUserData.email;
      uPhone = currentUserData.phone;
      uInstallation = currentUserData.installation;
      this.form.patchValue({firstName: uFirstName, lastName: uLastName, userID: uID,
        email: uEmail, phone: uPhone, installation: uInstallation});
    } else {
      // If there isn't an active user, ensure component is set to create new
      editMode = false;
    }
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
