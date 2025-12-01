import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { OrderService, VerifyOrderOtp } from '../../core/services/orders.service';

@Component({
  selector: 'app-order-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    InputOtpModule
  ],
  templateUrl: './order-verify-otp.component.html',
  styleUrl: './order-verify-otp.component.css'
})
export class OrderVerifyOtpComponent {

  orderId!: string;
  msgs: any[] = [];

  timer: number = 60;
  resendDisabled: boolean = true;
  intervalRef: any;

  form = new FormGroup({
    otp: new FormControl(null, Validators.required)
  })

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {
    this.orderId = this.route.snapshot.params['id'];
    this.startTimer();
  }

  startTimer() {
    this.resendDisabled = true;
    this.timer = 60;

    this.intervalRef = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.resendDisabled = false;
        clearInterval(this.intervalRef);
      }
    }, 1000);
  }

  resendOtp() {
    this.orderService.resendVerifyOtp(this.orderId).subscribe({
      next: (res: any) => {
        this.msgs = [{ severity: 'info', summary: 'OTP Sent', detail: 'OTP has been sent.' }];
        this.startTimer();
      },
      error: () => {
        this.msgs = [{ severity: 'error', summary: '', detail: 'Try again some time' }];
      }
    });
  }

  submit() {

    const verifyOrderOtp: VerifyOrderOtp = {
      orderId: this.orderId,
      otp: this.form.value.otp!
    }

    this.orderService.verifyOtp(verifyOrderOtp).subscribe({
      next: (res: any) => {
        this.msgs = [{ severity: 'success', summary: 'Delivered', detail: res.message }];
        this.router.navigate(['/admin/orders']);
      },
      error: () => {
        this.msgs = [{ severity: 'error', summary: 'Invalid OTP', detail: 'Try again' }];
      }
    });
  }
}
