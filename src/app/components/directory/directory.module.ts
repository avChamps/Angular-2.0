import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { HomePageComponent } from '../home-page/home-page.component';


@NgModule({
  declarations: [
    DirectoryComponent
  ],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    SharedModule
  ],
  exports : [
    DirectoryComponent
  ]
})
export class DirectoryModule { }
