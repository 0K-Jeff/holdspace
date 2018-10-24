import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCompModule } from './material-comp/material-comp.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthcheckComponent } from './authcheck/authcheck.component';
import { DisposalTransactionComponent } from './disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './disposal-list/disposal-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    TimerComponent,
    MenuComponent,
    AlertsComponent,
    AuthcheckComponent,
    DisposalTransactionComponent,
    DisposalListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialCompModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
