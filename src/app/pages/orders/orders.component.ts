import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.orders = this.ordersService.getAllOrders();
  }

  reorder(order: any) {
    console.log('Reorder clicked:', order.id);
    // You can implement reorder via CartService if needed
  }
}
