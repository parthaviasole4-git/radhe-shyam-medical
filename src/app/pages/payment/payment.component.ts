import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';
import { OrderService } from '../../core/services/orders.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  paymentMethod = 'cod';
  total = 0;
  userId = getUserIdFromToken();

  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrderService,
    private readonly router: Router,
    private readonly msg: MessageService
  ) { }

  ngOnInit() {
    this.cartService.getCart(this.userId).subscribe();

    // Calculate total
    this.cartService.cart$.subscribe(list => {
      this.total = list.reduce((sum, item) => sum + item.qty * (item.price ?? 0), 0);
    });
  }

  payNow() {
    if (this.paymentMethod !== 'cod') {
      this.msg.add({ severity: 'warn', summary: 'Only COD allowed', detail: 'Currently only Cash on Delivery is supported.', life: 1500 });
      return;
    }

    this.ordersService.placeOrder(this.userId).subscribe((order: any) => {
      this.cartService.getCart(this.userId).subscribe();
      this.router.navigate(['/payment-success'], { state: { orderId: order.id } });
    });
  }

}
