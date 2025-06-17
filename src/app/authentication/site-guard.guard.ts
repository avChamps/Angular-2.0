import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SiteGuardGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const emailId = sessionStorage.getItem('EmailId');
    const userName = sessionStorage.getItem('JwtToken');

    if (!emailId || !userName) {
      if (state.url === '/') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }

    if (state.url === '/') {
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }
}
