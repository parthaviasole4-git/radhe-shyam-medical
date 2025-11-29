import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemDto, CartService } from '../../core/services/cart.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';
import { forkJoin } from 'rxjs';

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
    private readonly productService: ProductService
  ) { }

  ngOnInit() {
    this.cartService.getCart(this.userId).subscribe();
    this.cartService.cart$.subscribe(res => {
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
    this.detectedItems = [{ name: 'Paracetamol 650mg', id: '00000000-0000-0000-0000-000000000001' }];
  }

  addDetectedToCart() {
    if (!this.detectedItems.length) return;

    const requests = this.detectedItems.map(item =>
      this.cartService.addToCart({ userId: this.userId, productId: item.id, qty: 1, price: 40  })
    );

    // Execute all add-to-cart API calls
    forkJoin(requests).subscribe(() => {
      this.cartService.getCart(this.userId).subscribe();
      this.detectedItems = [];
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}

