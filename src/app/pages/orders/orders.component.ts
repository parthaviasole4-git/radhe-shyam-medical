import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/orders.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  userId = getUserIdFromToken();

  constructor( private readonly OrderService: OrderService, private readonly router: Router) {}

  ngOnInit() {
    this.OrderService.getUserOrders(this.userId).subscribe((resonse)=>{
      this.orders = resonse ;
    })
  }

  track(order: any) {
    this.router.navigate(['/track', order.id], { state: { order }});
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
