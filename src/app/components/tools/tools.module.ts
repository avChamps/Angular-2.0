import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { ToolsComponent } from './tools.component';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { BtuCalculatorComponent } from './btu-calculator/btu-calculator.component';
import { VideoBandwithCalculatorComponent } from './video-bandwith-calculator/video-bandwith-calculator.component';
import { MileageExpenseFormComponent } from './mileage-expense-form/mileage-expense-form.component';


@NgModule({
  declarations: [
    ToolsComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ]
})
export class ToolsModule { }
