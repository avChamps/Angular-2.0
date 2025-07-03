import { Component, OnInit } from '@angular/core';
import { ToasterService, ToastMessage } from '../../shared/shared/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  toasts: ToastMessage[] = [];

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toast$.subscribe(toast => {
      this.toasts.push(toast);
   
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 3000);
    });
  }

  closeToast(toast: ToastMessage) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      default: return '';
    }
  }
}
