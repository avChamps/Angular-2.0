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
import { CoinsPageComponent } from '../../components/coins-page/coins-page.component';
import { ToasterService } from './toaster.service';
import { ToasterComponent } from '../../components/toaster/toaster.component';



@NgModule({
  declarations: [
    InitialsPipe,
    OnlyNumbersDirective,
    ClickOutsideDirective,
    ToasterComponent
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
    BsDatepickerModule,
    ToasterComponent
  ]
})
export class SharedModule { }
