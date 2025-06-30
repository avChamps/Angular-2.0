import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteJob, getCartItems, getCoinHistory, getJobs, getPointsLeaderboard, getProducts, getProfile, postJob } from '../../constants/api-constants';
declare var bootstrap: any;

export enum Section {
  Product = 'Product',
  Events = 'Events'
}

@Component({
  selector: 'app-user-admin-dashboard',
  templateUrl: './user-admin-dashboard.component.html',
  styleUrls: ['./user-admin-dashboard.component.css', '../../../assets/css/profile.css']
})
export class UserAdminDashboardComponent {
  jobForm!: FormGroup;
  isSubmitting = false;
  emailId: any;
  jobList: any;
  cartItems: any;
  currentSection: any;
  editProducts: any;
  coinsHistory: any[] = [];
  totalEarned: number = 0;
  totalSpent: number = 0;
  totalBalance: number = 0;
leaderboard: any[] = [];


  sectionStatus = [
    {
      label: 'Basic Details',
      fields: ['FullName', 'Gender', 'DOB', 'Mobile', 'ProfileEmailId'],
      complete: false
    },
    {
      label: 'Employment',
      fields: ['CompanyName', 'Designation', 'JoiningYear', 'JoiningMonth', 'CurrentJob'],
      complete: false
    },
    {
      label: 'Certifications',
      fields: ['CertificationName', 'CertificationId', 'CertificationUrl'],
      complete: false
    },
    {
      label: 'Address',
      fields: ['CurrentLocation', 'AddressLine1', 'Country', 'State', 'City', 'ZipCode'],
      complete: false
    },
    {
      label: 'Social Links',
      fields: ['TwitterUrl', 'LinkedInUrl', 'FacebookUrl'],
      complete: false
    }
  ];

  profileWeight = 0;
  profileData: any;



  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.emailId = localStorage.getItem('EmailId')
  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyMobile: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      jobDescription: ['', Validators.required],
      location: [''],
      jobType: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      category: [''],
      salary: [0],
      requirements: [''],
      benefits: [''],
      deadline: ['']
    });
    this.getJobs()
    this.getProducts();
    this.getCoinHistory();
    this.getProfiles();
    this.getLeaderboard();
  }


  getProfiles() {
    this.http.get(getProfile, {
      params: { emailId: this.emailId }
    }).subscribe((res: any) => {
      if (res.status && res.data?.length) {
        this.profileData = res.data[0];
        this.profileWeight = this.profileData.profileWeight;
        this.evaluateSections();
      }
    });
  }

  evaluateSections() {
    this.sectionStatus.forEach(section => {
      section.complete = section.fields.every(field => {
        const value = this.profileData[field];
        return value !== null && value !== undefined && value !== '';
      });
    });
  }


getLeaderboard() {
  this.http.get<{ status: boolean; leaderboard: any[] }>(getPointsLeaderboard).subscribe({
    next: (res) => {
      if (res.status) {
        this.leaderboard = res.leaderboard;
      }
    },
    error: (err) => {
      console.error('Error loading leaderboard:', err);
    }
  });
}


  getJobs() {
    this.http.get(getJobs, {
      params: {
        EmailId: this.emailId || ''
      }
    }).subscribe({
      next: (response: any) => {
        this.jobList = response?.data
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }


  getCoinHistory() {
    this.http.get(getCoinHistory, {
      params: {
        emailId: this.emailId || ''
      }
    }).subscribe({
      next: (response: any) => {
        this.coinsHistory = response?.history || [];

        this.totalEarned = 0;
        this.totalSpent = 0;

        for (let item of this.coinsHistory) {
          if (item.TransactionType === 'Earned') {
            this.totalEarned += item.Coins;
          } else if (item.TransactionType === 'Spent') {
            this.totalSpent += item.Coins;
          }
        }

        this.totalBalance = this.totalEarned - this.totalSpent;
      },
      error: (error) => {
        console.error('Error fetching Coin History:', error);
      }
    });
  }


  deleteJob(jobId: number) {
    this.http.delete(`${deleteJob}/${jobId}`).subscribe({
      next: () => {
        this.jobList = this.jobList.filter((job: { JobID: number; }) => job.JobID !== jobId);
        this.getJobs();
      },
      error: () => alert('Failed to delete job.')
    });
  }


  onSubmit(): void {

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    this.http.post(postJob, this.jobForm.value).subscribe(
      (res: any) => {
        this.jobForm.reset();
        this.jobForm.markAsUntouched();

        const modal = document.getElementById('postNewJob');
        const modalInstance = bootstrap.Modal.getInstance(modal!);
        modalInstance?.hide();
        this.jobForm.reset();
      },
      (err: any) => {
        alert('Error posting job.');
      }
    );
  }

  getProducts(): void {
    const emailId = localStorage.getItem('EmailId') || '';

    this.http.get(getProducts, {
      params: { emailId }
    }).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.cartItems = res.data;
        }
      },
      error: err => console.error('Failed to load products:', err)
    });
  }

  handleProductSaved() {
    this.getProducts();
    this.currentSection = null;
  }


  onSubmission(type: any, products?: any) {
    this.currentSection = type;
    this.editProducts = products;
  }
}
