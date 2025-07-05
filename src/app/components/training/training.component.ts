import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getTrainings, trainingContactUs, updateProfile } from '../../constants/api-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../shared/shared/toaster.service';
declare var bootstrap: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css', '../../../assets/css/profile.css']
})
export class TrainingComponent implements OnInit {
  courses: any;
  personalInfoForm!: FormGroup;
  isSaving: boolean = false;
  eventType : any;
clickedCourse : any;
 isMoreInfo : boolean = false;

  @ViewChild('personalInfoModal') personalInfoModal!: ElementRef;


  constructor(private http: HttpClient, private fb: FormBuilder, private toaster: ToasterService) {
    this.personalInfoForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.maxLength(32)]],
      Email: ['', [Validators.required, Validators.email,Validators.maxLength(64)]],
      Mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      Location: ['', [Validators.maxLength(64)]],
      IsWorking: [''],
      TrainingMode: ['']
    });
  }

  ngOnInit(): void {
    this.getEvents();
    let profileDataString = localStorage.getItem('ProfileData');

    if (profileDataString) {
      let profileData = JSON.parse(profileDataString);
       debugger;
      this.personalInfoForm?.patchValue({
        FullName: profileData?.FullName || '',
        Email: profileData?.EmailId || '',
        Mobile: profileData?.Mobile || '',
        Location: profileData?.City ||  profileData?.State || '',
        IsWorking: profileData?.WorkStatus ? 'yes' : 'no',
        TrainingMode: profileData?.TrainingMode || ''
      });
    }
    


  }


  getEvents() {
    this.http.get(getTrainings).subscribe({
      next: (response: any) => {
        this.courses = response.Trainings
      },
      error: (error) => {
        console.error('Error fetching trainings:', error);
        this.toaster.error('Error fetching trainings:')
      }
    });
  }


  isInvalid(controlName: string): boolean {
    const control = this.personalInfoForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  submitPersonalInfo(event?: Event) {
    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const formData = this.personalInfoForm.value;
    this.http.post(trainingContactUs, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        const modal = bootstrap.Modal.getInstance(this.personalInfoModal.nativeElement);
        modal?.hide(); // Hide the modal
      },
      error: (error) => {
        this.isSaving = false;
      }
    });

  }

enrollNow(type: any) {
  debugger;
  this.eventType = type;
}

moreInfo(data : any) {
  this.isMoreInfo = true;
    this.clickedCourse = data;
}

 openEnrollmentModal() {
    const modalEl = this.personalInfoModal?.nativeElement;
    if (modalEl) {
      setTimeout(() => {
       const modalInstance = new bootstrap.Modal(modalEl);
      modalInstance.show(); 
      }, 100);
    }
  }

}