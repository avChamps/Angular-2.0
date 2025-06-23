import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteJob, getJobs, postJob } from '../../constants/api-constants';
declare var bootstrap: any;

@Component({
  selector: 'app-user-admin-dashboard',
  templateUrl: './user-admin-dashboard.component.html',
  styleUrls: ['./user-admin-dashboard.component.css', '../../../assets/css/profile.css']
})
export class UserAdminDashboardComponent {
  jobForm!: FormGroup;
  isSubmitting = false;
  emailId : any;
  jobList : any;

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
}
