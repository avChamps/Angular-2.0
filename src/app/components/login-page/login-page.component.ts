import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { createAccount, login, verifyOtpAndRegister } from '../../constants/api-constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnDestroy,OnInit {
  isLogin: boolean = true;
  baseUrl = environment.APIURL;
  signupForm: FormGroup;
  otpForm: FormGroup;
  loginForm: FormGroup;
  showPassword: boolean = false;
  showOtpBox = false;
  errorMessage: string = '';
  loginErrorMessage: string = '';
  isSubmitting: boolean = false;
  isVerifyingOtp: boolean = false;
  isLoading = false;
  receivedValue :string = '';


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private actRoute: ActivatedRoute) {

    this.actRoute.params.subscribe((res: any) => {
      this.receivedValue = res['mode']
      if (this.receivedValue === 'login') {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })


    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  switchTab() {
    this.isLogin = !this.isLogin;
  }

  onClick(type: any) {
    let subvalue;

    if (type === 'google') {
      window.location.href = `${this.baseUrl}/auth/google?destination=${this.receivedValue}`
    } else if (type === 'linkedIn') {
      window.location.href = `${this.baseUrl}/auth/linkedin?destination=${this.receivedValue}`
    } else if (type === 'facebook') {
      window.location.href = `${this.baseUrl}/auth/facebook?destination=${this.receivedValue}`
    } else if (type === 'microsoft') {
      window.location.href = `${this.baseUrl}/auth/microsoft?destination${this.receivedValue}`
    }
  }

  ngOnDestroy(): void {
    this.signupForm.reset();
    this.loginForm.reset();
    this.otpForm.reset();
    this.errorMessage = '';
    this.loginErrorMessage = '';
    this.isSubmitting = false;
    this.isVerifyingOtp = false;
    this.isLoading = false;
    this.showOtpBox = false;
  }

  get otpControl(): FormControl {
    return this.otpForm.get('otp') as FormControl;
  }

  submitSignupForm() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { fullName, emailId, password } = this.signupForm.value;

    this.http.post(createAccount, {
      FullName: fullName,
      EmailId: emailId,
      Password: password,
    }).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.showOtpBox = true;
          this.isSubmitting = false;
          this.errorMessage = res.message;  // success message
        }
      },
      (err) => {
        // Show the error message from the API
        this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
        console.error(err);
        this.isSubmitting = false;
      }
    );
  }



  submitOtpForm() {
    if (this.otpForm.valid) {
      const { emailId } = this.signupForm.value;
      const { otp } = this.otpForm.value;
      this.isVerifyingOtp = true;
      this.http.post(verifyOtpAndRegister, {
        EmailId: emailId,
        otp: otp
      }).subscribe(
        (res: any) => {
          if (res.status) {
            window.localStorage.setItem('JwtToken', res.token);
            window.localStorage.setItem('EmailId', emailId);
            this.router.navigate(['/profile'])
            this.isVerifyingOtp = false;
          } else {
            this.errorMessage = res.message;
            this.isVerifyingOtp = false;
          }
        },
        err => {
          alert('user creation failed. Please try again.');
          console.error(err);
          this.isVerifyingOtp = false;
        }
      );
    }
  }


  submitLoginForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Show all errors
      return;
    }
    const { emailId, password } = this.loginForm.value;

    this.isLoading = true;

    this.http.post(login, { EmailId: emailId, Password: password }).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.status) {
          window.localStorage.setItem('JwtToken', res.token);
          window.localStorage.setItem('EmailId', emailId);
          this.router.navigate(['/profile'])
        } else {
          this.loginErrorMessage = res?.message
          console.log(res.message || 'Login failed');
        }
      },
      (err) => {
        this.isLoading = false;
        this.loginErrorMessage = err.error?.message || 'SignIn failed. Please try again.';
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
