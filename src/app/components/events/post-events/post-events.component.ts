import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventsComponent } from '../events.component';
declare var bootstrap: any;

@Component({
  selector: 'app-post-events',
  templateUrl: './post-events.component.html',
  styleUrls: ['./post-events.component.css','../events.component.css', '../../../../assets/css/profile.css']
})
export class PostEventsComponent extends EventsComponent {
  @ViewChild('submitEventModal') submitEventModal!: ElementRef;

 override ngOnInit(): void {
    setTimeout(() => {
      const modal = new bootstrap.Modal(this.submitEventModal.nativeElement);
      modal.show();
    }, 0);
    // this.ngOnInit()
  }
}
