import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemDto, CartService } from '../../core/services/cart.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';
import { forkJoin } from 'rxjs';
import { OcrService } from '../../core/services/ocr.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userId = getUserIdFromToken();
  cart: any[] = [];
  total: number = 0;
  detectedItems: any[] = [];
  file: File | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly productService: ProductService,
    private ocrService: OcrService
  ) {}

  ngOnInit() {
    this.cartService.getCart(this.userId).subscribe();
    this.cartService.cart$.subscribe((res) => {
      this.cart = res;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cart.reduce((s, x) => s + x.qty * (x.price ?? 0), 0);
  }

  increase(item: any) {
    this.cartService.updateQty(item.id, item.qty + 1, this.userId).subscribe();
  }

  decrease(item: any) {
    const newQty = item.qty > 1 ? item.qty - 1 : 0;

    if (newQty === 0) {
      this.cartService.remove(item.id, this.userId).subscribe();
      return;
    }

    this.cartService.updateQty(item.id, newQty, this.userId).subscribe();
  }

  remove(item: CartItemDto) {
    this.cartService.remove(item.id, this.userId).subscribe();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (!this.file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowed.includes(this.file.type)) {
      return;
    }

    this.ocrService.uploadPrescription(this.file).subscribe({
      next: (res) => (this.detectedItems = res),
      error: (err) => console.error(err),
    });
  }

  addDetectedToCart() {

    if (!this.detectedItems.length) return;

    // Step 1: For each detected OCR item, get product by ID
    const productRequests = this.detectedItems.map(
      (item) => this.productService.getById(item.id) // <-- Call API here
    );

    // Step 2: Run ALL product fetches in parallel
    forkJoin(productRequests).subscribe({
      next: (products) => {
        // Step 3: Now add each fetched product to cart
        const addToCartRequests = products.map((prod) =>
          this.cartService.addToCart({
            userId: this.userId,
            productId: prod.id,
            qty: 1,
            price: prod.price, // <-- REAL PRICE from DB
          })
        );

        // Step 4: Execute all add-to-cart API calls
        forkJoin(addToCartRequests).subscribe(() => {
          this.cartService.getCart(this.userId).subscribe();
          this.detectedItems = [];
        });
      },
      error: (err) => console.error(err),
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}

