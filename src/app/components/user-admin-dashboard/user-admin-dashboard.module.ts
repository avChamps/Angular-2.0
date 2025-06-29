import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminDashboardRoutingModule } from './user-admin-dashboard-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { UserAdminDashboardComponent } from './user-admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostJobComponent } from '../ekart-page/post-job/post-job.component';
import { EkartPageModule } from '../ekart-page/ekart-page.module';
import { EventsModule } from '../events/events.module';


@NgModule({
  declarations: [
    UserAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    UserAdminDashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    EkartPageModule,
    EventsModule
  ]
})
export class UserAdminDashboardModule { }
