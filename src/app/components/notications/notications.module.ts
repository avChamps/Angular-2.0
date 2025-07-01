import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticationsRoutingModule } from './notications-routing.module';
import { NoticationsComponent } from './notications.component';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
  declarations: [
    NoticationsComponent
  ],
  imports: [
    CommonModule,
    NoticationsRoutingModule,
    SharedModule
  ],
  exports : [
    NoticationsComponent
  ]
})
export class NoticationsModule { }
