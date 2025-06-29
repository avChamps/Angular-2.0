import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { addCoins } from '../../constants/api-constants';

@Component({
  selector: 'app-coins-page',
  templateUrl: './coins-page.component.html',
  styleUrl: './coins-page.component.css'
})
export class CoinsPageComponent {
 @Input() Coins : any;
 @Input() PageType : any;

constructor(private http : HttpClient) { }

addCoins(): void {
  debugger;
  let emailId = localStorage.getItem('EmailId')
  let coins = this.Coins;
  let PageType = this.PageType
  const payload = {
    emailId,
    coins,
    PageType
  };

  this.http.post(addCoins, payload).subscribe({
    next: (res: any) => {
      if (res.status) {
        console.log('Coins awarded:', coins);
      } else {
        console.warn('Coin award failed:', res.message);
      }
    },
    error: (err) => {
      console.error('Error awarding coins:', err);
    }
  });
}


}
