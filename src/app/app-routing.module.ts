import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthcheckComponent } from './authcheck/authcheck.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DisposalTransactionComponent } from './disposal-transaction/disposal-transaction.component';
import { DisposalListComponent } from './disposal-list/disposal-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'home', component: LandingpageComponent},
  { path: 'auth', component: AuthcheckComponent},
  { path: 'disposal', component: DisposalListComponent},
  { path: 'disposal/transaction', component: DisposalTransactionComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }