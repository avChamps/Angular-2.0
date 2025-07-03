import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'danger' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  success(message: string) {
    console.log('Success called');
    this.toastSubject.next({ type: 'success', message });
  }

  error(message: string) {
    this.toastSubject.next({ type: 'danger', message });
  }

  warning(message: string) {
    this.toastSubject.next({ type: 'warning', message });
  }
}
