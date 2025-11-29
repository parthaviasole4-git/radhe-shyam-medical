import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthService, SendOtpRequest } from '../../../core/services/auth.service';
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
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService)
  private readonly messageService = inject(MessageService)
  
  identifier: string = '';

  sendOtp() {
    if (!this.identifier.trim()) return;

    const sendOtpRequest: SendOtpRequest = {
      identifier: this.identifier
    };

    this.authService.sendOtp(sendOtpRequest).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP Sent Su', life: 800 });
        this.router.navigate(['/otp'], { queryParams: { value: this.identifier }});
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Something went wrong', life: 1500 });
      }
    });
  }

}
