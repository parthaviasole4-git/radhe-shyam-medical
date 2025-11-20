import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders = this.ordersService.getAllOrders();
  }

  track(order: any) {
    this.router.navigate(['/track', order.id], {
      state: { order }
    });
  }

  getProgress(status: string) {
    switch (status) {
      case 'Order Placed': return '20%';
      case 'Processing': return '40%';
      case 'Shipped': return '60%';
      case 'Out for Delivery': return '80%';
      case 'Delivered': return '100%';
      default: return '10%';
    }
  }
}
