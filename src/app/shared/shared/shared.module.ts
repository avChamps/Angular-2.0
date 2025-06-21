import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InitialsPipe } from '../../pipe/initials.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { OnlyNumbersDirective } from '../directives/only-numbers.directive';
import { ClickOutsideDirective } from '../directives/ClickOutsideDirective.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    InitialsPipe,
    OnlyNumbersDirective,
    ClickOutsideDirective

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    TooltipModule,
    BsDatepickerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    InitialsPipe,
    TooltipModule,
    OnlyNumbersDirective,
    ClickOutsideDirective,
    BsDatepickerModule
  ]
})
export class SharedModule { }
