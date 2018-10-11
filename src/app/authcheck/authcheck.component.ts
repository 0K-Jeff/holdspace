import { Component, OnInit } from '@angular/core';
import { SessionStoreAPI } from '../sessionStoreAPI';

@Component({
  selector: 'app-authcheck',
  templateUrl: './authcheck.component.html',
  styleUrls: ['./authcheck.component.css']
})

export class AuthcheckComponent implements OnInit {
  visititem: SessionStoreAPI = {
    ticker: sessionStorage.visitcount
  };

  constructor() { }

  ngOnInit() {
  }

}
