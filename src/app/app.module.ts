import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCompModule } from './material-comp/material-comp.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TimerComponent } from './menu-frame/timer/timer.component';
import { MenuComponent } from './menu-frame/menu/menu.component';
import { AlertsComponent } from './menu-frame/alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthcheckComponent } from './authcheck/authcheck.component';
import { DisposalTransactionComponent } from './dataentry-components/disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './dataentry-components/disposal-list/disposal-list.component';
import { UserTableComponent } from './dataentry-components/user-table/user-table.component';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';
import { RecycleListComponent } from './dataentry-components/recycle-list/recycle-list.component';
import { RecycleTransactionComponent } from './dataentry-components/recycle-transaction/recycle-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { InstallationPickerComponent } from './menu-frame/installation-picker/installation-picker.component';
import { InstallationIdboxComponent } from './installation-idbox/installation-idbox.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    TimerComponent,
    MenuComponent,
    AlertsComponent,
    AuthcheckComponent,
    DisposalTransactionComponent,
    DisposalListComponent,
    UserTableComponent,
    UserAdminComponent,
    RecycleListComponent,
    RecycleTransactionComponent,
    InstallationPickerComponent,
    InstallationIdboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialCompModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
