import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

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
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}

