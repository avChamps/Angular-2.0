import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { addNotification } from '../../constants/api-constants';

@Component({
  selector: 'app-notications',
  templateUrl: './notications.component.html',
  styleUrls: ['./notications.component.css']
})
export class NoticationsComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() pageType: string = '';

  emailId = localStorage.getItem('EmailId');

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['message']) {
      // Only trigger if title and message both present
      if (this.title && this.message) {
        this.addNotification(this.title, this.message, this.pageType);
      }
    }
  }

  addNotification(title: string, message: string, pageType: string = ''): void {
    const payload = {
      emailId: this.emailId,
      title,
      message,
      pageType
    };

    this.http.post(addNotification, payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          console.log('Notification added');
        }
      },
      error: (err) => console.error('Error adding notification:', err)
    });
  }
}