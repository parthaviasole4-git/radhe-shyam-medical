import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  total = 0;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.total = this.cart.getTotal();
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }
}
