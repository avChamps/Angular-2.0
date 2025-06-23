import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getProfiles } from '../../constants/api-constants';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css', '../../../assets/css/profile.css']
})
export class DirectoryComponent implements OnInit {
  isLoading: boolean = false;
  profileList: any[] = [];
  searchText: string = '';
  totalRecords: number = 0;
  page: number = 1;
  limit: number = 10;
  loading: boolean = false;
  visibleSocialIndex: number | null = null;

@HostListener('window:scroll', [])
onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.loading) {
    if (this.profileList.length < this.totalRecords) {
      this.page++;
      this.getProfiles(this.page, this.limit);
    }
  }
}


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProfiles(1, 10)
  }


getProfiles(page: number, limit: number) {
  if (this.loading) return;

  this.loading = true;
  const params = {
    search: this.searchText,
    page: page.toString(),
    limit: limit.toString()
  };

  this.http.get<any>(getProfiles, { params }).subscribe(
    (res) => {
      this.loading = false;
      if (res.status) {
        if (page === 1) {
          this.profileList = res.data; // replace on first page
        } else {
          this.profileList = [...this.profileList, ...res.data]; // append on scroll
        }

        this.totalRecords = res.totalRecords;
      }
    },
    (err) => {
      this.loading = false;
      console.error(err);
    }
  );
}



  contactUser(type: any) {

  }

  // visibleSocialIndex: number | null = null;

  toggleSocialPopup(index: number) {
    this.visibleSocialIndex = this.visibleSocialIndex === index ? null : index;
  }

  hideSocialPopup() {
    this.visibleSocialIndex = null;
  }

searchProfiles() {
  this.page = 1;
  this.profileList = [];
  this.totalRecords = 0;         // Reset this too
  this.loading = false;         // Important: reset loading state
  this.getProfiles(this.page, this.limit);
}

}