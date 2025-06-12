import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getProfiles } from '../../constants/api-constants';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.css'
})
export class DirectoryComponent implements OnInit {
  isLoading: boolean = false;
  profileList: any[] = [];


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProfiles('', 1, 10)
  }


  getProfiles(search: string = '', page: number = 1, limit: number = 10) {
    this.isLoading = true;

    const params = {
      search: search,
      page: page.toString(),
      limit: limit.toString()
    };

    this.http.get<any>(getProfiles, { params }).subscribe(
     (res) => {
      this.isLoading = false;
      if (res.status) {
        this.profileList = res.data;
      }
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    }
    );
  }

}