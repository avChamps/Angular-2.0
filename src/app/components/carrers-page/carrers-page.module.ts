import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrersPageRoutingModule } from './carrers-page-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { CarrersPageComponent } from './carrers-page.component';


@NgModule({
  declarations: [
    CarrersPageComponent
  ],
  imports: [
    CommonModule,
    CarrersPageRoutingModule,
    SharedModule
  ]
})
export class CarrersPageModule { }
