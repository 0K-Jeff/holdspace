import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserAdminService, UserListItem } from '../../dataentry-services/user-admin.service';
import { RESTClient } from '../../json-client.service';
import { Router } from '@angular/router';

let USER_DATA: UserListItem[] = [];

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit {
  // establish displayed columns
  displayedColumns: string[] = ['actions', 'lastName', 'ID', 'phone', 'email', 'installation', 'deactivatedDate'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userAdminService: UserAdminService,
              private restClient: RESTClient,
              private router: Router) { }

  ngOnInit() {
      // Bind method to pass on
    this.renderTableData = this.renderTableData.bind(this);

    this.restClient.getUserInfoTable(this.renderTableData);
  }

  renderTableData(dataSet) {
        // Clear Table for re-render
        USER_DATA = [];
        // Translate data into Table
        const JSONpacket = dataSet;
        for (let iter = 0; iter < JSONpacket.length; iter++) {
          // translate deactivatedDate into short string for readability
          let DD = null;
          if (JSONpacket[iter].deactivatedDate) {
            DD = new Date(JSONpacket[iter].deactivatedDate);
            DD = DD.toLocaleDateString();
          }
          // iterate through each entry to create user sub-array
          const arrayUser = {firstName: JSONpacket[iter].firstName, lastName: JSONpacket[iter].lastName,
           phone: JSONpacket[iter].phone, email: JSONpacket[iter].email, ID: JSONpacket[iter].id,
           installationID: JSONpacket[iter].orgId, installationName: JSONpacket[iter].orgName,
           isDbaCode: JSONpacket[iter].isDbaCode, userName: JSONpacket[iter].userName, deactivatedDate: DD};
           // push into table after creating array item
           USER_DATA.push(arrayUser);
        }
        this.dataSource = new MatTableDataSource(USER_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  SetChosenUser(userData) {
    return this.userAdminService.SetChosenUser(userData);
  }

  DisableUser(user) {
    // toggle the delete icon to ensure user wants to de-activate a user
    const targetedElement = document.getElementById('disableUser' + user.ID);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.deactivateUser(user.ID, this.renderTableData);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }
  }
  EnableUser(user) {
    // toggle the Activate icon to ensure user wants to re-activate a user
    const targetedElement = document.getElementById('enableUser' + user.ID);
    if (targetedElement.classList.contains('doubleCheck') === true) {
      this.restClient.activateUser(user.ID, this.renderTableData);
    } else {
      targetedElement.classList.toggle('doubleCheck');
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }


}
