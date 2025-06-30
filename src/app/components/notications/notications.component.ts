import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { addNotification } from '../../constants/api-constants';

@Component({
  selector: 'app-notications',
  templateUrl: './notications.component.html',
  styleUrl: './notications.component.css'
})
export class NoticationsComponent {
  @Input() title : any;
  @Input() message : any;
  @Input() pageType : any;

 emailId = localStorage.getItem('EmailId');

  constructor(private http: HttpClient) {}


   addNotification(title: string, message: string, pageType: string = ''): void {
    const payload = {
      emailId: this.emailId,
      title,
      message,
      pageType
    };

    this.http.post(addNotification, payload)
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            console.log('Notification added');
          }
        },
        error: (err) => console.error('Error adding notification:', err)
      });
  }
}
