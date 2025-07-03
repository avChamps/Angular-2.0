import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addToCart, checkout, deleteAllCartItem, deleteCartItem, getCartItems, getProducts, getProfile, updateCartQuantity } from '../../constants/api-constants';
declare var bootstrap: any;


interface Product {
  image: string;
  badge: string;
  tags: string[];
  quantity: number;
  date: string;
  title: string;
  description: string;
  author: {
    name: string;
    location: string;
    image: string;
  };
  price: number;
}


@Component({
  selector: 'app-ekart-page',
  templateUrl: './ekart-page.component.html',
  styleUrls: ['./ekart-page.component.css', '../../../assets/css/profile.css']
})
export class EkartPageComponent {
  postForm!: FormGroup;
  checkoutForm!: FormGroup;
  isPostItem: boolean = false;
  products: Product[] = [];
  selectedCondition: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchText: string = '';
  sortOrder: string = 'newest';
  isDisplayView: string = 'Grid';
  totalCount = 0;
  currentPage = 1;
  pageSize = 10;
  isFetching = false;
  selectedProduct: any;
  cartItems: any;
  cartItemCount = 0;
cartMessages: { [title: string]: string } = {};
  totalAmount: number = 0;
  loading = false;
  productStockMap: { [title: string]: number } = {};


  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isFetching) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      this.loadMoreProducts();
    }
  }


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/),
        Validators.maxLength(10)
      ])],
      paymentMethod: ['Cash on Delivery', Validators.required],
      notes: ['', Validators.maxLength(200)]
    });


    this.getProducts()
  }

  ngOnInit(): void {
    let profileDataString = localStorage.getItem('ProfileData');
    
    if (profileDataString) {
      let ProfileData = JSON.parse(profileDataString);      
      this.checkoutForm.patchValue({
        fullName: ProfileData.FullName || '',
        address: ProfileData.AddressLine1 || '',
        email: ProfileData.ProfileEmailId || ProfileData.EmailId || '',
        phoneNumber: ProfileData.Mobile || ''
      });
    }
  }
  

  getProducts(reset = true): void {
    if (reset) {
      this.products = [];
      this.currentPage = 1;
    }

    const params: any = {
      page: this.currentPage,
      limit: this.pageSize,
    };

    if (this.selectedCondition) params.condition = this.selectedCondition;
    if (this.minPrice !== null) params.minPrice = this.minPrice;
    if (this.maxPrice !== null) params.maxPrice = this.maxPrice;
    if (this.searchText) params.search = this.searchText;

    if (this.sortOrder === 'low') params.sort = 'price_asc';
    else if (this.sortOrder === 'high') params.sort = 'price_desc';
    else params.sort = 'newest';

    this.isFetching = true;

    this.http.get(getProducts, { params }).subscribe({
      next: (res: any) => {
        const apiItems = res?.data || [];
        this.totalCount = res?.totalCount || 0;
        const newProducts = apiItems.map((item: any) => ({
          image: item.ImageUrl || './images/placeholder.svg',
          badge: `Only ${item.Quantity} left`,
          tags: [item.Conditions, `Qty: ${item.Quantity}`],
          quantity: item.Quantity,
          date: new Date(item.PostedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          title: item.Title,
          description: item.Description,
          author: {
            name: item.EmailId.split('@')[0],
            location: item.Location,
            image: item?.ImagePath,
          },
          price: parseFloat(item.Price)
        }));

        this.products = [...this.products, ...newProducts];
        apiItems.forEach((item: any) => {
          this.productStockMap[item.Title] = item.Quantity;
        });
        this.totalCount = res?.totalCount || 0;
        this.isFetching = false;
        this.getKartItems()
      },
      error: err => {
        console.error('Error loading products', err);
        this.isFetching = false;
      }
    });
  }

  loadMoreProducts() {
    if (this.products.length < this.totalCount) {
      this.currentPage++;
      this.getProducts(false);
    }
  }

  applyPriceRange(min: number, max: number | null) {
    this.minPrice = min;
    this.maxPrice = max;
    this.getProducts();
  }


  postItem() {
    this.isPostItem = true;
  }

  clearAllFilters() {
    this.selectedCondition = '';
    this.minPrice = null;
    this.maxPrice = null;

    // Optionally, reset any selected radio buttons using IDs
    const radios = document.querySelectorAll('input[name="productType"]') as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => radio.checked = false);

    this.getProducts();
  }

  clearCart(): void {
  const emailId = localStorage.getItem('EmailId') || '';
  this.http.delete(deleteAllCartItem, {
    params: { emailId }
  }).subscribe({
    next: (res: any) => {
      if (res.status) {
        this.cartItems = [];
      }
    },
    error: err => console.error('Failed to clear cart:', err)
  });
}

  displayView(type: any) {
    debugger;
    this.isDisplayView = type;
  }

  openProductModal(product: any) {
    this.selectedProduct = product;

    // Update modal DOM elements
    setTimeout(() => {
      (document.getElementById('productModalImg') as HTMLImageElement).src = product.image;
      (document.getElementById('productModalBadge') as HTMLElement).innerText = product.badge;
      (document.getElementById('productModalTags') as HTMLElement).innerHTML = product.tags.map((tag: string) =>
        `<div class='kart-product-tag'>${tag}</div>`).join('');
      (document.getElementById('productModalDate') as HTMLElement).innerText = product.date;
      (document.getElementById('productModalTitle') as HTMLElement).innerText = product.title;
      (document.getElementById('productModalDesc') as HTMLElement).innerText = product.description;
      (document.getElementById('productModalAuthor') as HTMLElement).innerText = product.author.name;
      (document.getElementById('productModalLocation') as HTMLElement).innerText = product.author.location;
      (document.getElementById('productModalPrice') as HTMLElement).innerText = `₹${product.price}`;

      // Show modal using Bootstrap
      const modal = new bootstrap.Modal(document.getElementById('productDetailModal')!);
      modal.show();
    }, 0);
  }


  addToCartProduct(product: any) {
    const emailId = localStorage.getItem('EmailId');

    if (!emailId) {
      alert('Please log in to add to cart.');
      return;
    }

    const payload = {
      emailId,
      productId: product.id || 0,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.image
    };

    this.http.post(addToCart, payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.cartMessages[product.title] = 'Added';
          this.getKartItems();
        } else {
          // alert('Failed to add to cart');
        }
      },
      error: err => {
        console.error('Add to cart error:', err);
        // alert('Server error');
      }
    });
  }

  getKartItems() {
    let emailId = localStorage.getItem('EmailId') || '';
    this.http.get(getCartItems, {
      params: { emailId: emailId }
    }).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.cartItems = res.data;
          this.cartItemCount = res?.count;
          this.calculateTotalAmount();
          console.log('Cart:', this.cartItems);
        }
      },
      error: err => console.error('Failed to load cart:', err)
    });
  }


  increaseQuantity(item: any) {
    const maxAvailable = this.productStockMap[item.Title] || 0;
    const newQty = item.Quantity + 1;

    if (newQty > maxAvailable) {
      alert(`Only ${maxAvailable} items in stock.`);
      return;
    }

    this.http.put(updateCartQuantity, {
      kartId: item.KartID,
      quantity: newQty
    }).subscribe({
      next: (res: any) => {
        if (res.status) item.Quantity = newQty;
        this.calculateTotalAmount();
      },
      error: err => console.error('Failed to increase quantity', err)
    });
  }


  decreaseQuantity(item: any) {
    if (item.Quantity > 1) {
      const newQty = item.Quantity - 1;
      this.http.put(updateCartQuantity, {
        kartId: item.KartID,
        quantity: newQty
      }).subscribe({
        next: (res: any) => {
          if (res.status) item.Quantity = newQty;
          this.calculateTotalAmount();

        },
        error: err => console.error('Failed to decrease quantity', err)
      });
    }
  }

  removeFromCart(item: any) {
    this.http.delete(deleteCartItem, {
      params: { kartId: item.KartID }
    }).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.cartItems = this.cartItems.filter((i: { KartID: any; }) => i.KartID !== item.KartID);
          this.calculateTotalAmount();

        }
      },
      error: err => console.error('Failed to delete item', err)
    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total: number, item: { Price: string; Quantity: string; }) => {
      const price = parseFloat(item.Price);
      const quantity = parseInt(item.Quantity);
      return total + price * quantity;
    }, 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formData = this.checkoutForm.value;
    const payload = {
      emailId: localStorage.getItem('EmailId') || '',
      customerEmailId: formData.email,
      fullName: formData.fullName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      totalAmount: this.totalAmount,
      items: this.cartItems
    };

    this.http.post(checkout, payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          // alert('Order placed successfully!');
          // Close the modal
          const modalEl = document.getElementById('CheckoutModel');
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide();
          this.checkoutForm.reset();
          this.loading = false;
        }
      },
      error: err => {
        console.error('Checkout failed:', err);
        this.loading = false;
      }
    });
  }


}
