import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminDashboardComponent } from './user-admin-dashboard.component';

const routes: Routes = [
  { path : '', component : UserAdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminDashboardRoutingModule { }
