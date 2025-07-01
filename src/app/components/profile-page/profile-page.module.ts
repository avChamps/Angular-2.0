import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { NoticationsModule } from '../notications/notications.module';
import { EkartPageModule } from '../ekart-page/ekart-page.module';


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    SharedModule,
    NoticationsModule,
    EkartPageModule
  ],
  exports : [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
