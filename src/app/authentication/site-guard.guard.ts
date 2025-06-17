import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SiteGuardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    debugger;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      return true;
    } else {
      // Redirect to login if token or username is missing
      return this.router.parseUrl('/login');
    }
  }
}
