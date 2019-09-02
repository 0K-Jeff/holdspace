import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DisposalTransactionComponent } from './dataentry-components/disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './dataentry-components/disposal-list/disposal-list.component';
import { UserTableComponent } from './dataentry-components/user-table/user-table.component';
import { DataCallTableComponent } from './dataentry-components/datacall-table/datacall-table.component';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';
import { DataCallAdminComponent } from './dataentry-components/datacall-admin/datacall-admin.component';
import { RecycleListComponent } from './dataentry-components/recycle-list/recycle-list.component';
import { RecycleTransactionComponent } from './dataentry-components/recycle-transaction/recycle-transaction.component';
import { InstallationPickerComponent } from './dataentry-components/installation-picker/installation-picker.component';
import { UserRolePickerComponent } from './dataentry-components/user-role-picker/user-role-picker.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: LandingpageComponent},
  { path: 'disposal', component: DisposalListComponent},
  { path: 'disposal/transaction', component: DisposalTransactionComponent},
  { path: 'useradmin', component: UserTableComponent},
  { path: 'useradmin/user', component: UserAdminComponent},
  { path: 'datacalladmin', component: DataCallTableComponent},
  // { path: 'datacalladmin/datacall', component: DataCallAdminComponent},
  { path: 'recycling', component: RecycleListComponent},
  { path: 'recycling/transaction', component: RecycleTransactionComponent},
  { path: 'installation', component: InstallationPickerComponent},
  { path: 'session/userrole', component: UserRolePickerComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
