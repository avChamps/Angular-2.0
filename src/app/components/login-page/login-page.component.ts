import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { createAccount, verifyOtpAndRegister } from '../../constants/api-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  isLogin: boolean = true;
  baseUrl = environment.APIURL;
  signupForm: FormGroup;
  otpForm: FormGroup;
  showPassword = false;
  showOtpBox = false;

  switchTab() {
    this.isLogin = !this.isLogin;
  }

  onClick(type: any) {
    let subvalue;

    if (type === 'google') {
      window.location.href = `${this.baseUrl}/auth/google?destination`
    } else if (type === 'linkedIn') {
      window.location.href = `${this.baseUrl}/auth/linkedin?destination`
    } else if (type === 'facebook') {
      window.location.href = `${this.baseUrl}/auth/facebook?destination`
    } else if (type === 'microsoft') {
      window.location.href = `${this.baseUrl}/auth/microsoft?destination`
    }
  }


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });

  }

  get otpControl(): FormControl {
    return this.otpForm.get('otp') as FormControl;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submitSignupForm() {
    if (this.signupForm.invalid) return;

    const { fullName, emailId, password } = this.signupForm.value;

    this.http.post(createAccount, {
      FullName: fullName,
      EmailId: emailId,
      Password: password,
    }).subscribe(
      (res: any) => {
        if (res.status) {
          this.showOtpBox = true;
          alert('OTP sent to your email. Please verify.');
        } else {
          alert(res.message);
        }
      },
      err => {
        alert('Signup failed. Please try again.');
        console.error(err);
      }
    );
  }


  submitOtpForm() {
    if (this.otpForm.valid) {
      const { emailId } = this.signupForm.value;
      const { otp } = this.otpForm.value;

      this.http.post(verifyOtpAndRegister, {
        EmailId: emailId,
        otp: otp
      }).subscribe(
        (res: any) => {
          if (res.status) {
            alert('User CreatedSuccessfully');
          } else {
            alert(res.message);
          }
        },
        err => {
          alert('user creation failed. Please try again.');
          console.error(err);
        }
      );
    }
  }

}
