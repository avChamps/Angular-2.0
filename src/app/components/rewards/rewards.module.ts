import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';
import { CoinsPageComponent } from '../coins-page/coins-page.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { EkartPageComponent } from '../ekart-page/ekart-page.component';
import { EkartPageModule } from '../ekart-page/ekart-page.module';


@NgModule({
  declarations: [
    RewardsComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    EkartPageModule,
    SharedModule
  ]
})
export class RewardsModule { }
