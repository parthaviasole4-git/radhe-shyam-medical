import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { UserService, UserDto, CompleteProfileDto } from '../../core/services/user.service';
import { getUserIdFromToken } from '../../helper/jwt.helper';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userId = getUserIdFromToken();
  form!: FormGroup;
  user!: UserDto | null;
  total = 0;
  addressPopup = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      house: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required]
    });

    //Load User
    this.loadUser()

    // Load cart items 
    this.cartService.getCart(this.userId).subscribe();

    // Calculate total dynamically
    this.cartService.cart$.subscribe(list => {
      this.total = list.reduce((sum, item) => sum + item.qty * (item.price ?? 0), 0);
    });
  }

  loadUser() {
    this.userService.getById(this.userId).subscribe((user: any) => {
      this.user = user;
      this.form.patchValue({
        name: user.displayName ?? '',
        phone: user.identifier ?? '',
        house: user.address?.house ?? '',
        area: user.address?.area ?? '',
        city: user.address?.city ?? '',
        pincode: user.address?.pincode ?? '',
        state: user.address?.state ?? ''
      });
    });

  }

  openAddressDialog() {
    this.addressPopup = true;
  }

  saveAddress() {
    if (!this.user || this.form.invalid) return;

    const completeProfileDto: CompleteProfileDto = {
      displayName: this.form.value.name,
      phone: this.form.value.phone,
      email: '',
      address: {
        house: this.form.value.house,
        area: this.form.value.area,
        city: this.form.value.city,
        pincode: this.form.value.pincode,
        state: this.form.value.state,
      }
    };

    this.userService.completeProfile(this.user.id, completeProfileDto).subscribe(res => {
      this.addressPopup = false;
      this.loadUser();
    });
  }

  goToPayment() {
    if (!this.user?.address) return;
    this.router.navigate(['/payment']);
  }
}
