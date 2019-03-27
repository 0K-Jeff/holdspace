import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserAdminService, UserListItem } from '../../dataentry-services/user-admin.service';
import { JSONClientService } from '../../json-client.service';
import { Router } from '@angular/router';

let USER_DATA: UserListItem[] = [];

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserTableComponent implements OnInit {
  // establish displayed columns
  displayedColumns: string[] = ['actions', 'lastName', 'ID', 'phone', 'email', 'installation'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userAdminService: UserAdminService,
              private jsonClientService: JSONClientService,
              private router: Router) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<UserListItem>(this.tableRenderPacket());

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  tableRenderPacket() {
    // Clear Table for re-render
    USER_DATA = [];
    // Import and translate user list for display in the table
    const JSONpacket = JSON.parse(this.jsonClientService.getUserInfoTable());
    console.log(JSONpacket);
    for (let iter = 0; iter < JSONpacket.length; iter++) {
      // iterate through each entry to create user sub-array
      const arrayUser = {firstName: JSONpacket[iter].firstName, lastName: JSONpacket[iter].lastName,
       phone: JSONpacket[iter].phone, email: JSONpacket[iter].email, ID: JSONpacket[iter].id,
       installationID: JSONpacket[iter].orgId, installationName: JSONpacket[iter].orgName,
       userName: JSONpacket[iter].userName};

       // push into table after creating array item
       USER_DATA.push(arrayUser);
    }
    return USER_DATA;
  }

  SetChosenUser(userData) {
    return this.userAdminService.SetChosenUser(userData);
  }

  DisableUser(userID) {
    return undefined;
  }

}
