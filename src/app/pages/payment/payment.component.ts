import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';

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
export class PaymentComponent {
  isProcessing = false;
  paymentMethod = 'cod'; // default COD
  total = 0;

  constructor(
    private cart: CartService,
    private orders: OrdersService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit() {
    this.total = this.cart.getTotal();
  }

  payNow() {
    if (this.paymentMethod !== 'cod') {
      this.msg.add({
        severity: 'warn',
        summary: 'Only COD allowed',
        detail: 'Currently only Cash on Delivery is supported.',
        life: 1500,
      });
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {
      const items = this.cart.getCartItems();
      const order = this.orders.placeOrder(items, this.total);

      this.cart.clearCart();
      this.cart.updateCartCount();
      this.isProcessing = false;

      this.router.navigate(['/payment-success'], {
        state: { orderId: order.id },
      });
    }, 1500);
  }
}
