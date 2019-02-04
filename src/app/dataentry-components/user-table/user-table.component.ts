import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserAdminService, UserListItem } from '../../dataentry-services/user-admin.service';
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
  displayedColumns: string[] = ['name', 'id', 'phone', 'email', 'installation'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userAdminService: UserAdminService,
              private router: Router) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<UserListItem>(this.tableRenderPacket());

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  tableRenderPacket() {
    return undefined;
  }

  SetChosenUser(userData) {
    return undefined;
  }

  DisableUser(userID) {
    return undefined;
  }

}
