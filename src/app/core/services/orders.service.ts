import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OrderItem {
  product: any;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  amount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersList: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() {
    this.loadOrders();
  }

  /* Load from localStorage */
  private loadOrders() {
    const saved = localStorage.getItem('orders');
    if (saved) {
      this.ordersList = JSON.parse(saved);
      this.ordersSubject.next(this.ordersList);
    }
  }

  /* Save to localStorage */
  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.ordersList));
    this.ordersSubject.next(this.ordersList);
  }

  /* Generate Order ID */
  private generateOrderId(): string {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  /* Place an Order */
  placeOrder(items: OrderItem[], amount: number): Order {
    const newOrder: Order = {
      id: this.generateOrderId(),
      date: new Date().toDateString(),
      items,
      amount,
      status: 'Delivered'
    };

    this.ordersList.unshift(newOrder); // add on top like real apps
    this.saveOrders();

    return newOrder;
  }

  /* Get All Orders */
  getAllOrders(): Order[] {
    return [...this.ordersList];
  }

  /* Get a Single Order */
  getOrderById(id: string): Order | undefined {
    return this.ordersList.find(o => o.id === id);
  }

  /* Update Order Status */
  updateStatus(id: string, status: string) {
    const order = this.ordersList.find(o => o.id === id);
    if (order) {
      order.status = status;
      this.saveOrders();
    }
  }

  /* Clear All Orders (optional) */
  clearOrders() {
    this.ordersList = [];
    this.saveOrders();
  }
}

