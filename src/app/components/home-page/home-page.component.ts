import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../../assets/css/profile.css']
})
export class HomePageComponent {
  menuVisible = false;

  constructor(private router: Router, private actRoute : ActivatedRoute) { }

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

}
