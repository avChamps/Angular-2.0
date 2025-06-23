import { Component } from '@angular/core';

@Component({
  selector: 'app-ekart-page',
  templateUrl: './ekart-page.component.html',
  styleUrl: './ekart-page.component.css'
})
export class EkartPageComponent {
  isDropdownOpen = false;
  selectedSortOption = 'newest'; // default
  sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'lowToHigh', label: 'Price: Low to High' },
    { value: 'highToLow', label: 'Price: High to Low' }
  ];


   products = [
  {
    image: './assets/images/ekart/01_Image.webp',
    badgeText: 'For Sale',
    badgeClass: 'product_badge_sale',
    price: '₹399',
    tag: 'For Parts',
    quantity: 'Qty: 1',
    date: '6/20/2025',
    title: 'Mini Keyboard Convenient Wireless Keyboard, PC/Laptop',
    description: 'Mini Keyboard Convenient Wireless Keyboard, PC/Laptop',
    author: {
      name: 'test',
      location: 'Bangalore',
      icon: 't'
    }
  },
  {
    image: './assets/images/ekart/03_Image.webp',
    badgeText: 'Only 2Left',
    badgeClass: 'product_badge_left',
    price: '₹399',
    tag: 'For Parts',
    quantity: 'Qty: 1',
    date: '6/20/2025',
    title: 'Mini Keyboard Convenient Wireless Keyboard, PC/Laptop',
    description: 'Mini Keyboard Convenient Wireless Keyboard, PC/Laptop',
    author: {
      name: 'test',
      location: 'Bangalore',
      icon: 't'
    }
  }
];


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(value: string) {
    this.selectedSortOption = value;
    this.isDropdownOpen = false;
    console.log('Selected:', this.selectedSortOption);
    // Perform sorting logic if needed
  }

  getSelectedLabel() {
    const found = this.sortOptions.find(opt => opt.value === this.selectedSortOption);
    return found ? found.label : '';
  }
}
