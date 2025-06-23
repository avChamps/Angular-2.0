import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getProfile } from '../../constants/api-constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../../assets/css/profile.css']
})
export class HomePageComponent {
  menuVisible = false;
  token : any;
  emailId : any;
  profileData : any;
  isDrawerHidden = true;
  unreadCount : number = 10;

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


  constructor(private router: Router, private actRoute : ActivatedRoute, private http : HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        localStorage.setItem('jwtToken', this.token);
      }
    });

    let emailId = localStorage.getItem('EmailId');
    this.profileData = JSON.parse(localStorage.getItem('ProfileData') || '{}');
    if (emailId) {
      this.emailId = emailId;
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#userMenu') || target.closest('li');
    if (!clickedInside) {
      this.menuVisible = false;
    }

      const clickedNotication = (event.target as HTMLElement).closest('#notificationToggle');
    if (!clickedNotication) {
      this.isDrawerHidden = true;
    }
  }

  logOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

onNaviagate(router : any) {
  this.router.navigate([router])
}

 toggleDrawer(event: Event): void {
    event.stopPropagation();
    this.isDrawerHidden = !this.isDrawerHidden;
  }

}
