import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  cart$ = new BehaviorSubject<any[]>([]);
  cartCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
  }

  /* Load from localStorage */
  private loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cart = JSON.parse(saved);
      this.cart$.next(this.cart);
    }
  }

  /* Save to localStorage */
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
  }

  /* Get all cart items */
  getCartItems() {
    return [...this.cart];
  }

  /* Clear cart */
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  /* Add product to cart */
  addToCart(product: any) {
    const idx = this.cart.findIndex(x => x.product.id === product.id);

    if (idx >= 0) {
      this.cart[idx].qty += 1;
    } else {
      this.cart.push({
        product,
        qty: 1
      });
    }

    this.saveCart();
  }

  /* Increase quantity */
  increaseQty(id: number) {
    const item = this.cart.find(x => x.product.id === id);
    if (item) {
      item.qty++;
      this.saveCart();
    }
  }

  /* Decrease quantity */
  decreaseQty(id: number) {
    const item = this.cart.find(x => x.product.id === id);

    if (item) {
      if (item.qty > 1) {
        item.qty--;
      } else {
        this.removeFromCart(id);
        return;
      }
      this.saveCart();
    }
  }

  /* Remove product */
  removeFromCart(id: number) {
    this.cart = this.cart.filter(x => x.product.id !== id);
    this.saveCart();
  }

  /* Total amount */
  getTotal() {
    return this.cart.reduce(
      (sum, x) => sum + x.qty * x.product.price,
      0
    );
  }

  updateCartCount() {
    const cart: { qty: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((a: number, b: { qty: number }) => a + b.qty, 0);
    this.cartCount.next(count);
  }

}
