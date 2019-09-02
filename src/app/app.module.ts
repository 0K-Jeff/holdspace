import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCompModule } from './material-comp/material-comp.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TimerComponent } from './menu-frame/timer/timer.component';
import { MenuComponent } from './menu-frame/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DisposalTransactionComponent } from './dataentry-components/disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './dataentry-components/disposal-list/disposal-list.component';
import { UserTableComponent } from './dataentry-components/user-table/user-table.component';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';
import { RecycleListComponent } from './dataentry-components/recycle-list/recycle-list.component';
import { RecycleTransactionComponent } from './dataentry-components/recycle-transaction/recycle-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { InstallationPickerComponent } from './dataentry-components/installation-picker/installation-picker.component';
import { InstallationIdboxComponent } from './menu-frame/installation-idbox/installation-idbox.component';
import { InstallationEditorComponent } from './dataentry-components/installation-editor/installation-editor.component';
import { DataCallAdminComponent } from './dataentry-components/datacall-admin/datacall-admin.component';
import { DataCallTableComponent } from './dataentry-components/datacall-table/datacall-table.component';
import { UserRolePickerComponent } from './dataentry-components/user-role-picker/user-role-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    TimerComponent,
    MenuComponent,
    DisposalTransactionComponent,
    DisposalListComponent,
    UserTableComponent,
    UserAdminComponent,
    RecycleListComponent,
    RecycleTransactionComponent,
    InstallationPickerComponent,
    InstallationIdboxComponent,
    InstallationEditorComponent,
    DataCallAdminComponent,
    DataCallTableComponent,
    UserRolePickerComponent
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
