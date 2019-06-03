import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RESTClient } from '../../json-client.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-installation-picker',
  templateUrl: './installation-picker.component.html',
  styleUrls: ['./installation-picker.component.css']
})
export class InstallationPickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
