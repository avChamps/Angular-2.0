import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dismissNotification, getNotifications, getProfile, markAsRead } from '../../constants/api-constants';
import { ToasterService } from '../../shared/shared/toaster.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../../assets/css/profile.css']
})
export class HomePageComponent {
  menuVisible = false;
  token: any;
  emailId: any;
  profileData: any;
  isDrawerHidden = true;
  unreadCount: number = 0;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    const clickedInsideMenu = target.closest('#userMenu') || target.closest('li');
    if (!clickedInsideMenu) {
      this.menuVisible = false;
    }

    const clickedNotificationToggle = target.closest('#notificationToggle');
    const clickedInsideDrawer = target.closest('#notificationDrawer');

    if (!clickedNotificationToggle && !clickedInsideDrawer) {
      this.isDrawerHidden = true;
    }
  }


  notifications = [
    {
      id: 1,
      type: 'success',
      icon: '✔',
      title: 'Points earned',
      message: 'You earned 15 points! Reason: Daily login reward',
      timestamp: 'about 8 hours ago',
      isRead: false
    },
    {
      id: 2,
      type: 'info',
      icon: 'ℹ️',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated.',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: 3,
      type: 'warning',
      icon: '⚠️',
      title: 'Password Expiring',
      message: 'Your password will expire in 5 days. Please update it.',
      timestamp: '1 day ago',
      isRead: false
    },
    {
      id: 4,
      type: 'alert',
      icon: '🔔',
      title: 'New Message',
      message: 'You have received a new message from support.',
      timestamp: '10 minutes ago',
      isRead: false
    },
    {
      id: 5,
      type: 'success',
      icon: '✔',
      title: 'Points earned',
      message: 'You earned 30 points! Reason: Completed survey',
      timestamp: 'yesterday',
      isRead: true
    },
    {
      id: 6,
      type: 'event',
      icon: '📅',
      title: 'Webinar Reminder',
      message: 'AV Champs webinar starts in 30 minutes. Don’t miss it!',
      timestamp: '30 minutes ago',
      isRead: false
    }
  ];


  constructor(private router: Router, private actRoute: ActivatedRoute, private http: HttpClient, private route: ActivatedRoute, private toaster: ToasterService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        localStorage.setItem('jwtToken', this.token);
      }
    });

    let emailId = localStorage.getItem('EmailId');
    setTimeout(() => {
      this.profileData = JSON.parse(localStorage.getItem('ProfileData') || '{}');
    }, 1000);
    if (emailId) {
      this.emailId = emailId;
    }
    this.getNotifications()
  }
  getNotifications() {
    this.http.get(getNotifications, {
      params: { emailId: this.emailId }
    }).subscribe({
      next: (response: any) => {
        this.unreadCount = response.unreadCount;
        this.notifications = response.notifications.map((item: any) => ({
          id: item.NotificationID,
          title: item.Title,
          message: item.Message,
          timestamp: this.formatTimestamp(item.CreatedAt),
          isRead: item.IsRead === 1,
          type: this.mapPageTypeToType(item.PageType),
          icon: this.mapPageTypeToIcon(item.PageType)
        }));
      },
      error: () => { 
        // alert('Failed to fetch notifications');
        this.toaster.error('Failed to fetch notifications');
      }
    });
  }


  mapPageTypeToIcon(pageType: string) {
    switch (pageType.toLowerCase()) {
      case 'event': return 'bi-calendar-event';
      case 'login': return 'bi-award';
      case 'alert': return 'bi-bell';
      default: return 'bi-info-circle';
    }
  }

  mapPageTypeToType(pageType: string) {
    switch (pageType.toLowerCase()) {
      case 'event': return 'event';
      case 'login': return 'success';
      case 'alert': return 'alert';
      default: return 'info';
    }
  }

  formatTimestamp(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (diffMs < 60000) return 'Just now';
    if (diffMs < 3600000) return `${Math.floor(diffMs / 60000)} minutes ago`;
    if (diffMs < 86400000) return `${Math.floor(diffMs / 3600000)} hours ago`;
    return date.toLocaleDateString();
  }

  getIconClass(type: string): string {
    return {
      'success': 'text-success',
      'info': 'text-primary',
      'warning': 'text-warning',
      'alert': 'text-danger',
      'event': 'text-info'
    }[type] || 'text-secondary';
  }


  markAsRead(event: Event, item: any) {
    event.stopPropagation();
    this.http.post(markAsRead, { notificationId: item.id }).subscribe({
      next: () => {
        item.isRead = true;
        this.getNotifications();
      },
      error: () => alert('Failed to mark as read')
    });
  }
  
  dismissNotification(event: Event, item: any) {
    event.stopPropagation();
    this.http.post(dismissNotification, { notificationId: item.id }).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== item.id);
        this.getNotifications();
      },
      error: () => alert('Failed to dismiss notification')
    });
  }
  

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  logOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  onNaviagate(router: any) {
    this.router.navigate([router])
  }

  toggleDrawer(event: Event): void {
    event.stopPropagation();
    this.isDrawerHidden = !this.isDrawerHidden;
  }

  markAllAsRead(event: Event) {
    event.stopPropagation();
    
    this.http.post(markAsRead, { markAll: true, emailId: this.emailId }).subscribe({
      next: () => {
        this.getNotifications();
      },
      error: () => this.toaster.error('Failed to mark all as read')
    });
  }
  

}
