import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getEvents, postEvents } from '../../constants/api-constants';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css', '../../../assets/css/profile.css']
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;
  isSaving : boolean = false;
  isPostEvent : boolean = false;
  events : any;
  selectedCategory: string = '';
  totalRecords : any;
 

  categories: string[] = [
    'Conference',
    'Workshop',
    'Masterclass',
    'Bootcamp',
    'Certification',
    'Festival',
    'Seminar'
  ];
  

  constructor(private fb: FormBuilder, private http : HttpClient) {
    this.eventForm = this.fb.group({
      Title: ['', Validators.required],
      ShortDescription: ['', Validators.required],
      FullDetails: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Location: ['', Validators.required],
      EventType: ['', Validators.required],
      RegistrationUrl: [''],
    });
  }

  ngOnInit(): void {
    this.getEvents()
  }


  getEvents() {
    let params = new HttpParams();
  
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      params = params.set('category', this.selectedCategory);
    }
  
    this.http.get(getEvents, { params }).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.events = res?.Events;
          this.totalRecords = res?.totalRecords;
        } else {
          this.events = [];
          this.totalRecords = 0;
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.events = [];
        this.totalRecords = 0;
      }
    });
  }
  

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched(); // Show validation errors
      return;
    }

    this.isSaving = true;
    const formData = this.eventForm.value;
    this.http.post(postEvents, formData).subscribe({
      next: (response) => {
        this.isSaving = false;
        this.isPostEvent = false;
        this.getEvents();
      },
      error: (error : any) => {
        this.isSaving = false;
      }
    });
  }
}