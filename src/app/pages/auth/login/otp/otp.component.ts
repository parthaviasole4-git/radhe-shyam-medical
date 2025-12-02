import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { AuthService, SendOtpRequest, VerifyOtpRequest } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputOtpModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService)

  loading = false;
  identifier: string = '';
  otp: string = '';

  constructor() {
    const value = this.route.snapshot.queryParamMap.get('value');
    this.identifier = value ?? '';
  }

  verifyOtp() {
    if (this.otp.length !== 6) return;

    const verifyOtpRequest: VerifyOtpRequest = {
      identifier: this.identifier,
      code: this.otp
    }

    this.authService.verifyOtp(verifyOtpRequest).subscribe({
      next: (response: any) => {
        if (response?.token) {
          localStorage.setItem("token", response?.token);
          if(response?.user?.isAdmin){
            this.router.navigate(['/admin/dashboard']);
            return
          }
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Something went wrong', life: 1500 });
      }
    })
  }

  resendOtp() {
    const sendOtpRequest: SendOtpRequest = {
      identifier: this.identifier
    }

    this.authService.sendOtp(sendOtpRequest).subscribe({
      next: (response) => {
        this.otp = '';
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 800 });
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Something went wrong', life: 1500 });
      }
    });
  }

  changeNumber() {
    this.router.navigate(['/login']);
  }
}
