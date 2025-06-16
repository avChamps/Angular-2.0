import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    SharedModule
  ],
  exports : [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
