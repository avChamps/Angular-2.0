import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { postItem, updateProduct } from '../../../constants/api-constants';
declare var bootstrap: any;

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent implements AfterViewInit {
  postItemForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: any = null;
  loading: boolean = false;
  showCoins : boolean = true;
  @Input() Products : any;
  @Output() onProductSaved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

ngOnInit(): void {
  this.postItemForm = this.fb.group({
    ItemId: [null], // ✅ Add this line
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    condition: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(3)]],
    emailId: [localStorage.getItem('EmailId'), [Validators.required, Validators.email]]
  });

  if (this.Products) {
    this.postItemForm.patchValue({
      ItemId: this.Products.ItemId, // ✅ populate it
      title: this.Products.Title,
      description: this.Products.Description,
      price: this.Products.Price,
      quantity: this.Products.Quantity,
      condition: this.Products.Conditions,
      location: this.Products.Location,
      emailId: this.Products.EmailId
    });
    this.previewUrl = this.Products.ImageUrl;
  }
}


  get f() {
    return this.postItemForm.controls;
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageInput(): void {
    const input = document.getElementById('imageInput') as HTMLElement;
    input.click();
  }

submitForm(): void {
  if (this.postItemForm.invalid) {
    this.postItemForm.markAllAsTouched();
    alert('Please complete the form.');
    return;
  }

  const formData = new FormData();
  Object.entries(this.postItemForm.value).forEach(([key, value]) => {
    if (value !== null) {
      formData.append(key, value as string);
    }
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.loading = true;

let endPoint : any;

      if(this.Products) {
       endPoint = updateProduct;
   } else {
    endPoint = postItem;
   }
  
  this.http.post(endPoint, formData).subscribe({
    next: () => {
      this.loading = false;
      this.postItemForm.reset();
      this.selectedFile = null;
      this.previewUrl = null;
      if(endPoint === postItem) {
      this.showCoins = true;
      }
      const modalEl = document.getElementById('PostItem');
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
        this.onProductSaved.emit();
      }
    },
    error: err => {
      console.error('Submit error:', err);
      this.loading = false;
    }
  });
}


  ngAfterViewInit(): void {
    const modalElement = document.getElementById('PostItem');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
