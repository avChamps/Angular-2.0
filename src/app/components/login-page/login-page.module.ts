import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { NoticationsModule } from '../notications/notications.module';
import { EkartPageModule } from '../ekart-page/ekart-page.module';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    SharedModule,
    NgOtpInputModule,
    NoticationsModule,
    EkartPageModule
  ]
})
export class LoginPageModule { }
