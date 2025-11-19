import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-payment-success',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

  orderId: number | null = null;

  constructor(private router: Router) {
    this.orderId = history.state?.orderId ?? null;
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

