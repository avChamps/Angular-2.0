import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EkartPageRoutingModule } from './ekart-page-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { EkartPageComponent } from './ekart-page.component';
import { PostJobComponent } from './post-job/post-job.component';
import { CoinsPageComponent } from '../coins-page/coins-page.component';


@NgModule({
  declarations: [
    EkartPageComponent,
    PostJobComponent,
    CoinsPageComponent
  ],
  imports: [
    CommonModule,
    EkartPageRoutingModule,
    SharedModule
  ],
  exports : [
    PostJobComponent
  ]
})
export class EkartPageModule { }
