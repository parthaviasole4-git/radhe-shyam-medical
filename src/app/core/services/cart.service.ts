import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface CartItemRequestDto {
  userId: string;
  productId: string;
  qty: number;
  price: number;
}

export interface CartItemDto {
  id: string;
  userId: string;
  productId: string;
  productName?: string; 
  price?: number;
  imageUrl?: string;
  qty: number;
}

export interface AddToCartResponse {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly base = `${environment.api}/Cart`;

  cart$ = new BehaviorSubject<any[]>([]);
  cartCount = new BehaviorSubject<number>(0);

  constructor(private readonly http: HttpClient) {}

  // Load Cart on App Start
  init(userId: string) {
    this.getCart(userId).subscribe();
  }

  // REFRESH CART
  refreshCart(userId: string) {
    this.getCart(userId).subscribe();
  }

  // Cart Count
  updateCartCount(items: CartItemDto[]) {
    const count = items.reduce((n, x) => n + x.qty, 0);
    this.cartCount.next(count);
  }

  // ADD TO CART
  addToCart(cartItemRequestDto: CartItemRequestDto): Observable<AddToCartResponse> {
    return this.http.post<AddToCartResponse>(`${this.base}`, cartItemRequestDto).pipe(
      tap(() => this.refreshCart(cartItemRequestDto.userId))
    );
  }

  // GET USER CART
  getCart(userId: string): Observable<CartItemDto[]> {
    return this.http.get<CartItemDto[]>(`${this.base}/${userId}`).pipe(
      tap(items => {
        this.cart$.next(items);
        this.updateCartCount(items);
      })
    );
  }

  // REMOVE ITEM
  remove(id: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(
      tap(() => this.refreshCart(userId))
    );
  }

  // UPDATE ITEM QUANTITY
  updateQty(id: string, qty: number, userId: string): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}/${qty}`, {}).pipe(
      tap(() => this.refreshCart(userId))
    );
  }

}
