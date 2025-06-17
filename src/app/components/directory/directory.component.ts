import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getProfiles } from '../../constants/api-constants';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css','../../../assets/css/profile.css']
})
export class DirectoryComponent implements OnInit {
  isLoading: boolean = false;
  profileList: any[] = [];
  searchText : string = '';
  totalRecords : number = 0;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProfiles(1, 10)
  }


  getProfiles(page: number = 1, limit: number = 10) {
    this.isLoading = true;

    const params = {
      search: this.searchText,
      page: page.toString(),
      limit: limit.toString()
    };

    this.http.get<any>(getProfiles, { params }).subscribe(
     (res) => {
      this.isLoading = false;
      if (res.status) {
        this.profileList = res.data;
        this.totalRecords = res.totalRecords;
      }
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    }
    );
  }

  contactUser(type : any) {
    
  }

visibleSocialIndex: number | null = null;

toggleSocialPopup(index: number) {
  this.visibleSocialIndex = this.visibleSocialIndex === index ? null : index;
}

hideSocialPopup() {
  this.visibleSocialIndex = null;
}

}