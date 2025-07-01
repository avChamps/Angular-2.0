import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EkartPageRoutingModule } from './ekart-page-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { EkartPageComponent } from './ekart-page.component';
import { PostJobComponent } from './post-job/post-job.component';
import { CoinsPageComponent } from '../coins-page/coins-page.component';
import { NoticationsModule } from '../notications/notications.module';


@NgModule({
  declarations: [
    EkartPageComponent,
    PostJobComponent,
    CoinsPageComponent
  ],
  imports: [
    CommonModule,
    EkartPageRoutingModule,
    SharedModule,
    NoticationsModule
  ],
  exports : [
    PostJobComponent,
    CoinsPageComponent
  ]
})
export class EkartPageModule { }
