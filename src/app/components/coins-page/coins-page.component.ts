import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { addCoins } from '../../constants/api-constants';
import { NoticationsComponent } from '../notications/notications.component';

@Component({
  selector: 'app-coins-page',
  templateUrl: './coins-page.component.html',
  styleUrl: './coins-page.component.css'
})
export class CoinsPageComponent implements OnInit {
  @Input() Coins: number = 0;
  @Input() PageType: string = '';
  @Input() Description: string = '';
  @Input() TransactionType: string = 'Earned';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.addCoins();
  }

  addCoins(): void {
    const emailId = localStorage.getItem('EmailId');
    if (!emailId || !this.Coins || !this.PageType || !this.TransactionType) {
      console.warn('Missing required transaction parameters');
      return;
    }

    const payload = {
      emailId,
      coins: this.Coins,
      pageType: this.PageType,
      description: this.Description || '',
      transactionType: this.TransactionType
    };

    this.http.post(addCoins, payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          console.log(`Transaction successful: ${this.Coins} coins ${this.TransactionType}`);
        } else {
          console.warn('Transaction failed:', res.message);
        }
      },
      error: (err) => console.error('Error recording transaction:', err)
    });
  }
}
