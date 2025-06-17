import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ProfilePageModule } from '../profile-page/profile-page.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { DirectoryModule } from '../directory/directory.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ProfilePageModule,
    DirectoryModule,
    SharedModule,
  ],
  exports : [
    HomePageComponent
  ]
})
export class HomePageModule { }
