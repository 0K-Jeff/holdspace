import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthcheckComponent } from './authcheck/authcheck.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DisposalTransactionComponent } from './dataentry-components/disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './dataentry-components/disposal-list/disposal-list.component';
import { UserTableComponent } from './dataentry-components/user-table/user-table.component';
import { UserAdminComponent } from './dataentry-components/user-admin/user-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'home', component: LandingpageComponent},
  { path: 'auth', component: AuthcheckComponent},
  { path: 'disposal', component: DisposalListComponent},
  { path: 'disposal/transaction', component: DisposalTransactionComponent},
  { path: 'useradmin', component: UserTableComponent},
  { path: 'useradmin/user', component: UserAdminComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
