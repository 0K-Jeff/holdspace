import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserAdminService, UserListItem } from '../../dataentry-services/user-admin.service';
import { JSONClientService } from '../../json-client.service';
import { Router } from '@angular/router';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';

let USER_DATA: UserListItem[] = [];

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserTableComponent implements OnInit {
  // establish displayed columns
  displayedColumns: string[] = ['name', 'id', 'phone', 'email', 'installation'];
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

    for (let iter = 0; iter < JSONpacket.length; iter++) {
      // iterate through each entry to create user sub-array
      const arrayUser = {firstName: JSONpacket[iter].firstName, lastName: JSONpacket[iter].lastName,
       phone: JSONpacket[iter].phone, email: JSONpacket[iter].eMail, ID: JSONpacket[iter].id,
       installation: JSONpacket[iter].orgId};

       // push into table after creating array item
       USER_DATA.push(arrayUser);
    }
    return USER_DATA;
  }

  SetChosenUser(userData) {
    return undefined;
  }

  DisableUser(userID) {
    return undefined;
  }

}
