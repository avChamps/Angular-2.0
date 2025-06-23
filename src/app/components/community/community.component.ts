import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css','../../../assets/css/profile.css']
})
export class CommunityComponent {
storedProfile : any;

   constructor() {
    debugger;
   let storedProfile = JSON.parse(sessionStorage.getItem('profileData') || '');
   this.storedProfile = storedProfile;
   }
}
