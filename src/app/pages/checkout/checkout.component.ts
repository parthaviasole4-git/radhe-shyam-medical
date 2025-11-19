import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  total = 0;

  address: any = null;
  addressPopup = false;

  form = {
    name: '',
    house: '',
    area: '',
    city: '',
    pincode: '',
    phone: ''
  };

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.total = this.cart.getTotal();

    const saved = localStorage.getItem('address');
    if (saved) this.address = JSON.parse(saved);
  }

  openAddressDialog() {
    this.addressPopup = true;
  }

  saveAddress() {
    this.address = { ...this.form };
    localStorage.setItem('address', JSON.stringify(this.address));
    this.addressPopup = false;
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }
}
