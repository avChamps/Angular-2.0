import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getRewards, redeemReward } from '../../constants/api-constants';

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
  selectedReward: any = null;
userID: any = null;
emailId : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.totalCoins = sessionStorage.getItem('CoinsHistory') || 0;
    this.emailId = sessionStorage.getItem('EmailId') || '';
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
    this.selectedReward = reward;
    const modal: any = new (window as any).bootstrap.Modal(document.getElementById('confirmRedemptionModal'));
    modal.show();
  }
  

  redeemReward(): void {
    if (!this.selectedReward || !this.emailId) return;
  
    const body = {
      EmailId: this.emailId,
      RewardID: this.selectedReward.ID,
      PointsUsed: this.selectedReward.Points
    };
  
    this.http.post<any>(redeemReward, body).subscribe(res => {
      if (res.status) {
        alert('Redemption successful!');
        this.totalCoins -= this.selectedReward.Points;
        sessionStorage.setItem('CoinsHistory', this.totalCoins);
      } else {
        alert(res.message);
      }
    });
  }
  

}
