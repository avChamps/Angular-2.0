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

  constructor(private router: Router, private actRoute : ActivatedRoute, private http : HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        localStorage.setItem('jwtToken', this.token);
      }
    });

    let emailId = localStorage.getItem('EmailId');
    if (emailId) {
      this.emailId = emailId;
    }
    this.getProfiles()
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
  }

  logOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

onNaviagate(router : any) {
  this.router.navigate([router])
}

getProfiles() {
  this.http.get(getProfile, {
    params: {
      emailId: this.emailId || '',
      JwtToken: this.token || ''
    }
  }).subscribe({
    next: (response: any) => {
      this.profileData = response?.profile;
    },
    error: (error) => {
      console.error('Error fetching profile:', error);
    }
  });
}


}
