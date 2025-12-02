import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  AuthService,
  SendOtpRequest,
} from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  identifier: string = '';

  sendOtp() {
    if (!this.identifier.trim()) return;

    let value = this.identifier.trim();

    // If only 10 digits → assume Indian mobile → convert automatically
    const phoneRegex = /^[0-9]{10}$/;

    if (phoneRegex.test(value)) {
      value = '+91' + value;
    }

    const sendOtpRequest: SendOtpRequest = {
      identifier: value,
    };

    this.authService.sendOtp(sendOtpRequest).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'OTP Sent Successfully',
          life: 800,
        });
        this.router.navigate(['/otp'], { queryParams: { value } });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Something went wrong',
          life: 1500,
        });
      },
    });
  }

  // Block non-digit keys while typing
  allowOnlyDigits(event: KeyboardEvent) {
    const char = event.key;

    // Allow only digits
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }

  // Remove any pasted non-digit characters
  filterDigits() {
    this.identifier = this.identifier.replace(/\D/g, '');
  }
}
