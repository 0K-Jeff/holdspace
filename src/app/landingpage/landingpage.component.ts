import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    if (sessionStorage.visitcount) {
      sessionStorage.visitcount = Number(sessionStorage.visitcount) + 1;
    } else {
      sessionStorage.visitcount = 1;
    }

  }

}
