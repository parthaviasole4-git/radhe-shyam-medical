import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  cart: any[] = [];
  total = 0;
  detectedItems: any[] = [];
  file: File | null = null;


  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(res => {
      this.cart = res;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, x) => sum + x.qty * x.product.price, 0);
  }

  increase(id: number) {
    this.cartService.increaseQty(id);
    this.cartService.updateCartCount();
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
    this.cartService.updateCartCount();
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.cartService.updateCartCount();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (!this.file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowed.includes(this.file.type)) {
      return;
    }
    this.detectedItems = [{ name: 'Paracetamol 650mg', id: 1 }];
  }

  addDetectedToCart() {
    if (!this.detectedItems.length) return;

    this.detectedItems.forEach(item => {
      const product = this.productService.getById(item.id);
      if (!product) return;
      this.cartService.addToCart(product);
    });

    this.cartService.updateCartCount();
    this.detectedItems = [];
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}

