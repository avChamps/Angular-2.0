import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getRewards, redeemReward } from '../../constants/api-constants';
import { ToasterService } from '../../shared/shared/toaster.service';
import { Router } from '@angular/router';
declare var bootstrap : any;

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css', '../../../assets/css/profile.css']
})
export class RewardsComponent {
  rewardsList: any[] = [];
  featuredRewards: any[] = [];
  filteredCategory: string = 'all';
  currentSlide = 0;
  totalCoins: any;
  selectedReward: any;
  userID: any = null;
  emailId: any;
  showLoginRewards: boolean = false;
  isRedeeming: boolean = false;

  constructor(private http: HttpClient, private toasterService : ToasterService, public route: Router) { }

  ngOnInit(): void {
    this.totalCoins = sessionStorage.getItem('CoinsHistory') || 0;
    this.emailId = localStorage.getItem('EmailId') || '';
    this.loadRewards();
  }

  loadRewards(): void {
    this.http.get<any>(getRewards).subscribe(res => {
      if (res.status) {
        this.rewardsList = res.rewards;
        this.featuredRewards = res.rewards.filter((r: { IsFeatured: any; }) => r.IsFeatured);
      }
    });
  }

  filterRewards(category: string): void {
    this.filteredCategory = category;
  }

  prevSlide(): void {
    if (this.featuredRewards.length > 0) {
      this.currentSlide = (this.currentSlide - 1 + this.featuredRewards.length) % this.featuredRewards.length;
    }
  }

  nextSlide(): void {
    if (this.featuredRewards.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.featuredRewards.length;
    }
  }


  openRedeemModal(reward: any): void {
    debugger;
    this.selectedReward = reward;
  }


  redeemReward(): void {
    if (!this.selectedReward || !this.emailId) return;
 this.isRedeeming = true;
    const body = {
      EmailId: this.emailId,
      RewardID: this.selectedReward.ID,
      PointsUsed: this.selectedReward.Points
    };

    this.http.post<any>(redeemReward, body).subscribe(res => {
      if (res.status) {
        this.totalCoins -= this.selectedReward.Points;
        this.showLoginRewards = true;
         this.isRedeeming = false;
          const modalElement = document.getElementById('confirmRedemptionModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement) 
                          || new bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
        this.toasterService.success('Redemption successful!')
      } else {
        this.toasterService.error('Redemption Failed')
        this.isRedeeming = false;
      }
    });
  }

}
