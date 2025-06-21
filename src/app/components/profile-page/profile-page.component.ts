import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCities, getCountries, getProfile, getStates, updateProfile } from '../../constants/api-constants';
import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;

export enum TabType {
  Personal = "Personal",
  Professional = "Professional",
  Address = "Address"
}



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css', '../../../assets/css/profile.css']
})
export class ProfilePageComponent {
  currentSection = TabType.Personal;
  TabType = TabType;
  personalInfoForm!: FormGroup;
  professionalForm!: FormGroup;
  certificationForm!: FormGroup;
  addressForm !: FormGroup;
  socialForm!: FormGroup;
  emailId = '';
  isSaving: boolean = false;
  imageLoadError = false;
  profileData: any;
  token: any;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  selectedCountryCode = '';
  selectedStateCode = '';
  progress: number = 0;
  @ViewChild('personalInfoModal') personalInfoModal!: ElementRef;
  @ViewChild('profModal') profModal!: ElementRef;
  @ViewChild('certModal') certModal!: ElementRef;
  @ViewChild('addressModal') addressModal!: ElementRef;

  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY'
  };

  years: number[] = [];

  months = [
    { name: 'Jan', value: '01' },
    { name: 'Feb', value: '02' },
    { name: 'Mar', value: '03' },
    { name: 'Apr', value: '04' },
    { name: 'May', value: '05' },
    { name: 'Jun', value: '06' },
    { name: 'Jul', value: '07' },
    { name: 'Aug', value: '08' },
    { name: 'Sep', value: '09' },
    { name: 'Oct', value: '10' },
    { name: 'Nov', value: '11' },
    { name: 'Dec', value: '12' }
  ];


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        localStorage.setItem('jwtToken', this.token);
      }
    });

    let emailId = localStorage.getItem('EmailId');
    if (emailId) {
      this.emailId = emailId;
    }

    // this.emailId = 'gdisendra@gmail.com'

    this.personalInfoForm = this.fb.group({
      FullName: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      Gender: ['', Validators.required],
      DOB: ['', Validators.required],
      WorkStatus: ['', Validators.required],
      Mobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/),
        Validators.maxLength(10)
      ])],
      ProfileEmailId: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ])],
      EmailId: [this.emailId]
    });


    this.professionalForm = this.fb.group({
      CurrentJob: ['', Validators.required],
      EmploymentType: ['', Validators.required],
      ExperienceYears: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      ExperienceMonths: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern(/^[0-9]{1,2}$/)
      ])],

      CompanyName: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      Designation: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      JoiningYear: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      JoiningMonth: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern(/^[0-9]{1,2}$/)
      ])],
      SalaryAmount: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      SalaryDuration: [''],
      EmailId: this.emailId
    });

    this.certificationForm = this.fb.group({
      CertificationName: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      CertificationId: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      CertificationUrl: ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
      ValidFromMonth: ['', Validators.required],
      ValidFromYear: ['', Validators.required],
      ValidToMonth: [''],
      ValidToYear: [''],
      NoExpiry: [false],
      EmailId: this.emailId
    });

    this.addressForm = this.fb.group({
      CurrentLocation: ['', Validators.required],
      AddressLine1: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      AddressLine2: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      ZipCode: ['', [Validators.required, Validators.compose([Validators.pattern(/^[0-9]{4,10}$/), Validators.maxLength(6)])]],
      EmailId: this.emailId
    });

    this.socialForm = this.fb.group({
      TwitterUrl: ['', [Validators.pattern(/^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/)]],
      LinkedInUrl: ['', [Validators.pattern(/^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/)]],
      FacebookUrl: ['', [Validators.pattern(/^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+$/)]],
      EmailId: this.emailId
    });

    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 31 }, (_, i) => currentYear - i);
    this.onExpiryChange();
    this.getProfiles();
    this.getCountries();
  }


  onExpiryChange(): void {
    this.certificationForm.get('NoExpiry')?.valueChanges.subscribe((noExpiry) => {
      if (noExpiry) {
        this.certificationForm.get('ValidToMonth')?.disable();
        this.certificationForm.get('ValidToYear')?.disable();
      } else {
        this.certificationForm.get('ValidToMonth')?.enable();
        this.certificationForm.get('ValidToYear')?.enable();
      }
    });
  }


  onTabSelection(type: any) {
    this.currentSection = type;
  }

  getCountries() {
    this.http.get(getCountries, {
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.countries = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      }
    })
  }


  onCountryChange(countryCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.selectedCountryCode = countryCode;
      this.addressForm.patchValue({ State: '', City: '' });
      this.states = [];
      this.cities = [];

      if (!countryCode) return resolve(); // resolve early if empty

      this.http.post<any>(getStates, { countryCode }).subscribe({
        next: (res) => {
          if (res.success) {
            this.states = res.data;
          }
          resolve(); // ensure promise resolves even if no states found
        },
        error: (err) => {
          console.error('Error fetching states:', err);
          reject(err);
        }
      });
    });
  }

  onStateChange(stateCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.selectedStateCode = stateCode;
      this.addressForm.patchValue({ City: '' });
      this.cities = [];

      if (!this.selectedCountryCode || !stateCode) return resolve();

      this.http.post<any>(getCities, {
        countryCode: this.selectedCountryCode,
        stateCode
      }).subscribe({
        next: (res) => {
          if (res.success) {
            this.cities = res.data;
          }
          resolve();
        },
        error: (err) => {
          console.error('Error fetching cities:', err);
          reject(err);
        }
      });
    });
  }



  getProfiles() {
    this.http.get(getProfile, {
      params: {
        emailId: this.emailId || '',
        JwtToken: this.token || ''
      }
    }).subscribe({
      next: (response: any) => {
        const profile = response?.profile;
        this.profileData = response?.profile;
        this.progress = this.profileData.profileWeight;
        if (profile) {
          localStorage.setItem('EmailId', profile.EmailId);
          this.patchValue(profile);
        }
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }




  submitForm() {
    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const formData = this.personalInfoForm.value;
    this.http.post(updateProfile, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal = bootstrap.Modal.getInstance(this.personalInfoModal.nativeElement);
        modal?.hide();
        this.getProfiles();
      },
      error: (error) => {
        this.isSaving = false;
      }
    });
  }


  submitProfessionalForm() {
    if (this.professionalForm.invalid) {
      this.professionalForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.professionalForm.value;
    this.http.post(updateProfile, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal = bootstrap.Modal.getInstance(this.profModal.nativeElement);
        modal?.hide();
        this.getProfiles();
      },
      error: (error) => {
        this.isSaving = false;
      }
    });
  }



  submitCertificationForm() {
    if (this.certificationForm.invalid) {
      this.certificationForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.certificationForm.value;
    this.http.post(updateProfile, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal = bootstrap.Modal.getInstance(this.certModal.nativeElement);
        modal?.hide();
        this.getProfiles();
      },
      error: (error) => {
        this.isSaving = false;
      }
    });
  }

  submitAddressForm() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.addressForm.value;
    this.http.post(updateProfile, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal = bootstrap.Modal.getInstance(this.addressModal.nativeElement);
        modal?.hide();
        this.getProfiles();
      },
      error: (error) => {
        this.isSaving = false;
      }
    });
  }

  submitSocialLinksForm() {
    if (this.socialForm.invalid) {
      this.socialForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.socialForm.value;

    this.http.post(updateProfile, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal1 = bootstrap.Modal.getInstance(document.getElementById('twitterModal')!);
        const modal2 = bootstrap.Modal.getInstance(document.getElementById('linkedinModal')!);
        const modal3 = bootstrap.Modal.getInstance(document.getElementById('facebookModal')!);
        modal1?.hide();
        modal2?.hide();
        modal3?.hide();
        this.getProfiles();
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Error saving social links', error);
      }
    });
  }




  preventNonNumericInput(event: KeyboardEvent) {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }


  patchValue(profile: any) {
    debugger;
    // const DOB = profile.DOB ? new Date(profile.DOB).toISOString().split('T')[0] : ''
    this.personalInfoForm.patchValue({
      FullName: profile.FullName,
      Gender: profile.Gender || '',
      DOB: profile.DOB ? new Date(profile.DOB) : null,
      WorkStatus: profile.WorkStatus,
      Mobile: profile.Mobile,
      ProfileEmailId: profile.ProfileEmailId,
    });

    this.professionalForm.patchValue({
      CompanyName: profile.CompanyName,
      Designation: profile.Designation,
      JoiningYear: profile.JoiningYear,
      JoiningMonth: profile.JoiningMonth,
      ExperienceYears: profile.ExperienceYears,
      ExperienceMonths: profile.ExperienceMonths,
      EmploymentType: profile.EmploymentType,
      CurrentJob: profile.CurrentJob,
      SalaryAmount: profile.SalaryAmount,
      SalaryDuration: profile.SalaryDuration || '',
    });

    this.addressForm.patchValue({
      CurrentLocation: profile.CurrentLocation,
      AddressLine1: profile.AddressLine1,
      AddressLine2: profile.AddressLine2,
      Country: profile.Country || '',
      State: profile.State || '',
      City: profile.City || '',
      ZipCode: profile.ZipCode
    });
    this.onCountryChange(profile.Country).then(() => {
      this.addressForm.patchValue({ State: profile.State || '' });
      this.onStateChange(profile.State).then(() => {
        this.addressForm.patchValue({ City: profile.City || '' });
      });
    });

    this.socialForm.patchValue({
      TwitterUrl: profile.TwitterUrl,
      LinkedInUrl: profile.LinkedInUrl,
      FacebookUrl: profile.FacebookUrl
    });



  }

  onImageError(event: Event): void {
    this.imageLoadError = true;
  }

  onImageLoad(): void {
    this.imageLoadError = false;
  }
}
