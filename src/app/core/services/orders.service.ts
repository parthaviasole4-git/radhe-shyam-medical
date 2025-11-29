import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderDto {
  id: string;
  userId: string;
  items: OrderItemDto[];
  status: string;
  totalAmount: number;
  createdAt: string;
}

export interface ApiMessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly base = `${environment.api}/Order`;

  constructor(private readonly http: HttpClient) { }

  // PLACE ORDER
  placeOrder(userId: string): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.base}/place`, JSON.stringify(userId),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  // GET USER ORDERS
  getUserOrders(userId: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.base}/user/${userId}`);
  }

  // GET ORDER DETAILS
  getOrder(orderId: string): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.base}/${orderId}`);
  }

  // ADMIN — GET ALL ORDERS
  getAll(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.base}/all`);
  }

  // UPDATE STATUS
  updateStatus(orderId: string, status: string): Observable<ApiMessageResponse> {
    return this.http.put<ApiMessageResponse>(`${this.base}/${orderId}/status`, status);
  }

  // DELETE ORDER
  delete(orderId: string): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base}/${orderId}`);
  }
}

