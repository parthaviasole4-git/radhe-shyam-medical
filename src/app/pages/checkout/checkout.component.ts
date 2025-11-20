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
    email: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    pincode: ''
  };

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.total = this.cart.getTotal();

    // Load from profile
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      this.address = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        house: profile.address.house,
        area: profile.address.area,
        city: profile.address.city,
        pincode: profile.address.zip
      };
    }

    // Load custom saved address (if user edited)
    const saved = localStorage.getItem('address');
    if (saved) this.address = JSON.parse(saved);
  }

  openAddressDialog() {
    this.addressPopup = true;
  }

  saveAddress() {
    this.address = { ...this.form };
    localStorage.setItem('address', JSON.stringify(this.address));

    // SYNC BACK TO PROFILE
    const profile = {
      name: this.form.name,
      email: this.form.email,
      phone: this.form.phone,
      address: {
        house: this.form.house,
        area: this.form.area,
        city: this.form.city,
        zip: this.form.pincode,
        state: '',
        country: 'India'
      }
    };

    localStorage.setItem('profile', JSON.stringify(profile));

    this.addressPopup = false;
  }

  goToPayment() {
    if (!this.address) return;
    this.router.navigate(['/payment']);
  }
}
