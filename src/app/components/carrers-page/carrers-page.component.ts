import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { applyJob, getJobs, getJobStats } from '../../constants/api-constants';
import { ActivatedRoute, Router } from '@angular/router';

var bootstrap: any;

@Component({
  selector: 'app-carrers-page',
  templateUrl: './carrers-page.component.html',
  styleUrls: ['./carrers-page.component.css', '../../../assets/css/profile.css']
})
export class CarrersPageComponent implements OnInit {
  searchKeyword = '';
  searchLocation = '';
  sortOption = '';
  minSalary = 0;
  maxSalary = 50;
  emailId: any;
  jobList: any;
  selectedCategory = '';
  selectedJobType = '';
  selectedExperience = '';
  totalJobs = 0;
  activeFilters = '';
  selectedJob: any = null;
  fileName = '';
  showDefault = true;
  showFileArea = false;
  showProgress = false;
  showFinalStep = false;
  uploadProgress = 0;
  uploadInterval: any;
  selectedFile: File | null = null;
  isApplying = false;
  companyInfo: any;
  currentUrl: any;
  twitterUrl: any;
  linkedinUrl: any;
  facebookUrl: any;
  whatsappUrl: any;
  currentDate: string = new Date().toLocaleDateString();
  @ViewChild('closePopup') closePopup!: ElementRef<HTMLButtonElement>;


  categories = [
    { name: 'All', count: 1 },
    { name: 'AV Engineer', count: 1 },
    { name: 'AV Designer', count: 0 },
    { name: 'CAD Engineer', count: 0 },
    { name: 'Pre-Sales', count: 0 },
    { name: 'AV Support', count: 0 },
    { name: 'AV Events', count: 0 },
    { name: 'AV Project', count: 0 }
  ];

  jobTypes = [
    { name: 'Full-time', count: 1 },
    { name: 'Part-time', count: 0 },
    { name: 'Contract', count: 0 },
    { name: 'Remote', count: 0 },
    { name: 'Internship', count: 0 }
  ];

  experienceLevels = [
    { name: 'Entry Level', count: 1 },
    { name: 'Mid Level', count: 0 },
    { name: 'Senior Level', count: 0 }
  ];


  constructor(private http: HttpClient, private router: Router, actRouter : ActivatedRoute) {
    this.emailId = localStorage.getItem('EmailId')
   actRouter.paramMap.subscribe(params => {
      const jobId = params.get('id');
      if (jobId) {
        this.getJobs(jobId);
      } else {
        this.getJobs()
        this.getJobStats();
        this.applyFilters();
      }
    });

  }


  ngOnInit(): void {
 
  }

  getJobs(jobId ?:any) {
    const params: any = { EmailId: this.emailId };

    if (jobId) {
      params.jobId = jobId;
    }
  
    this.http.get(getJobs, { params }).subscribe({
      next: (response: any) => { 
        if (response.status && response.data) {
          this.jobList = response.data.map((job: any) => ({
            initial: job.CompanyName?.charAt(0) || '',
            title: job.JobTitle,
            company: job.CompanyName,
            type: job.JobType?.toLowerCase() || '',
            location: job.Location,
            posted: this.getPostedText(job.PostedDate),
            salary: `₹${job.Salary}L`,
            shortDesc: job.Description?.split('\n')[0] || '',
            skills: job.Requirements?.split(',').map((s: string) => s.trim()) || [],
            fullDesc: job.Description,
            EmailId: job.EmailId,
            JobID: job.JobID,
            Status: job.Applied
          }));
          if (jobId) {
          this.selectedJob = this.jobList[0];
          }
        }
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }


  getPostedText(dateString: string): string {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - postedDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Posted just now';
    if (diffHours < 24) return `Posted about ${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `Posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.selectedJobType = '';
    this.selectedExperience = '';
    this.maxSalary = 50;
    this.searchKeyword = '';
    this.searchLocation = '';
    this.applyFilters();
  }

  selectJobType(type: string) {
    this.selectedJobType = type;
    this.selectedCategory = '';
    this.selectedExperience = '';
    this.searchKeyword = '';
    this.searchLocation = '';
    this.maxSalary = 50;
    this.applyFilters();
  }

  selectExperience(experience: string) {
    this.selectedExperience = experience;
    this.selectedCategory = '';
    this.selectedJobType = '';
    this.searchKeyword = '';
    this.searchLocation = '';
    this.maxSalary = 50;
    this.applyFilters();
  }


  applyFilters() {
    const params: any = { EmailId: this.emailId };

    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedJobType) params.type = this.selectedJobType;
    if (this.selectedExperience) params.experience = this.selectedExperience;
    if (this.maxSalary) params.maxSalary = this.maxSalary;

    if (this.searchKeyword) params.keyword = this.searchKeyword;
    if (this.searchLocation) params.location = this.searchLocation;
    if (this.sortOption) params.sort = this.sortOption;

    this.http.get<any>(getJobs, { params }).subscribe({
      next: (res) => {
        if (res.status) {
          this.totalJobs = res.data.length;
          this.activeFilters = `${this.selectedCategory || ''} ${this.selectedJobType || ''} ${this.selectedExperience || ''} ${this.searchKeyword || ''} ${this.searchLocation || ''} Salary ≤ ₹${this.maxSalary}L`.trim();

          this.jobList = res.data.map((job: any) => ({
            initial: job.CompanyName?.charAt(0) || '',
            title: job.JobTitle,
            company: job.CompanyName,
            type: job.JobType?.toLowerCase() || '',
            location: job.Location,
            posted: this.getPostedText(job.PostedDate),
            salary: `₹${job.Salary}L`,
            shortDesc: job.Description?.split('\n')[0] || '',
            skills: job.Requirements?.split(',').map((s: string) => s.trim()) || [],
            fullDesc: job.Description,
            EmailId: job.EmailId,
            JobID: job.JobID,
            Status: job.Applied
          }));
        }
      }
    });
  }



  getJobStats() {
    this.http.get<any>(getJobStats, { params: { EmailId: this.emailId } }).subscribe({
      next: (res) => {
        if (res.status) {
          this.categories = res.data.categories;
          this.jobTypes = res.data.jobTypes;
          this.experienceLevels = res.data.experienceLevels;
        }
      }
    });
  }

  selectJob(job: any) {
    this.selectedJob = job;
    this.currentUrl = window.location.origin + this.router.url + '/job/' + job.JobID;
    this.whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.currentUrl)}`;
    this.twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.currentUrl)}`;
    this.linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.currentUrl)}`;
    this.facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
  }

  sortBy(type: string) {
    this.sortOption = type;
    this.applyFilters();
  }

  clearAll() {
    this.selectedCategory = '';
    this.selectedJobType = '';
    this.selectedExperience = '';
    this.maxSalary = 50;
    this.applyFilters();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;  // Store file reference
      this.fileName = file.name;
      this.showDefault = false;
      this.showFileArea = true;

      setTimeout(() => {
        this.startUpload();
      }, 500);
    }
  }


  changeFile() {
    this.resetFileUpload();
  }

  startUpload() {
    this.showFileArea = false;
    this.showProgress = true;
    this.uploadProgress = 0;

    this.uploadInterval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 5;
      } else {
        clearInterval(this.uploadInterval);
        this.showProgress = false;
        this.showFinalStep = true;
      }
    }, 200);
  }

  cancelUpload() {
    clearInterval(this.uploadInterval);
    this.resetFileUpload();
  }

  onJobApply(job: any) {
    this.companyInfo = job
  }


  onApplyJob() {
    if (!this.selectedFile || !this.companyInfo) {
      alert('Please select a file before proceeding.');
      return;
    }

    this.isApplying = true;
    const reader = new FileReader();
    reader.onload = () => {
      const resumeBase64 = reader.result?.toString().split(',')[1];

      const payload = {
        CompanyName: this.companyInfo.company,
        CompanyEmailId: this.companyInfo.EmailId,
        JobID: this.companyInfo.JobID,
        SenderName: localStorage.getItem('UserName') || 'User',
        senderEmailId: localStorage.getItem('EmailId') || '',
        Resume: resumeBase64
      };

      this.http.post(applyJob, payload).subscribe({
        next: () => {
          alert('Application submitted successfully!');
          this.resetFileUpload();
          this.isApplying = false;
          this.closePopup.nativeElement.click();
        },
        error: (err) => {
          console.error('Error sending application:', err);
          alert('Failed to submit application.');
          this.isApplying = false;
        }
      });
    };

    reader.readAsDataURL(this.selectedFile);
  }



  resetFileUpload() {
    this.fileName = '';
    this.showDefault = true;
    this.showFileArea = false;
    this.showProgress = false;
    this.showFinalStep = false;
    this.uploadProgress = 0;
    clearInterval(this.uploadInterval);
  }

}
