import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminDashboardRoutingModule } from './user-admin-dashboard-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { UserAdminDashboardComponent } from './user-admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    UserAdminDashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserAdminDashboardModule { }
