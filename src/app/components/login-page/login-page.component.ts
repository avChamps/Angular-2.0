import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  isLogin : boolean = true;


  switchTab() {
   this.isLogin = !this.isLogin;
  }

}
