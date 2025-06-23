import { Component, HostListener, OnInit } from '@angular/core';
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
  isSaving: boolean = false;
  isPostEvent: boolean = false;
  events: any;
  selectedCategory: string = '';
  totalRecords: any;
  currentPage = 1;
  limit = 10;
  loading = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.loading) {
      this.loadMoreEvents();
    }
  }



  categories: string[] = [
    'Conference',
    'Workshop',
    'Masterclass',
    'Bootcamp',
    'Certification',
    'Festival',
    'Seminar'
  ];


  constructor(private fb: FormBuilder, private http: HttpClient) {
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


  loadMoreEvents() {
    if (this.events.length >= this.totalRecords) return;

    this.currentPage++;
    this.fetchEvents(true);
  }

  getEvents() {
    this.currentPage = 1;
    this.fetchEvents(false);
  }

  fetchEvents(append: boolean = false) {
    this.loading = true;
    let params = new HttpParams()
      .set('page', this.currentPage)
      .set('limit', this.limit);

    if (this.selectedCategory && this.selectedCategory !== 'All') {
      params = params.set('category', this.selectedCategory);
    }

    this.http.get(getEvents, { params }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.status) {
          this.totalRecords = res.totalRecords;
          this.events = append ? [...this.events, ...res.Events] : res.Events;
        } else if (!append) {
          this.events = [];
        }
      },
      error: () => {
        this.loading = false;
        this.events = [];
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
      error: (error: any) => {
        this.isSaving = false;
      }
    });
  }
}