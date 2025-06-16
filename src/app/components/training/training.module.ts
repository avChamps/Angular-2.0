import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingComponent } from './training.component';
import { TrainingOverviewComponent } from './training-overview/training-overview.component';


@NgModule({
  declarations: [
    TrainingComponent,
    TrainingOverviewComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    SharedModule
  ]
})
export class TrainingModule { }
