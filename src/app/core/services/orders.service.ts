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

export interface VerifyOrderOtp {
  orderId: string;
  otp: string;
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

  //MARK OUT OF DELIEVERY
  markOutOfDelievery(orderId: string): Observable<ApiMessageResponse> {
    return this.http.put<ApiMessageResponse>(`${this.base}/${orderId}/status`, {});
  }

  //RESEND OTP
  resendVerifyOtp(orderId: string): Observable<ApiMessageResponse> {
    return this.http.post<ApiMessageResponse>(`${this.base}/resend-otp/${orderId}`, {});
  }

  // VERIFY ORDER OTP
  verifyOtp(request: VerifyOrderOtp): Observable<ApiMessageResponse> {
    return this.http.post<ApiMessageResponse>(`${this.base}/verify-delivery-otp`, request);
  }

  // DELETE ORDER
  delete(orderId: string): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base}/${orderId}`);
  }
}

