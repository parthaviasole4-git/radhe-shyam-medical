import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

/* ---------------------------------------
   DTOs (Same file as requested)
----------------------------------------- */

export interface SendOtpRequest {
  identifier: string;
}

export interface VerifyOtpRequest {
  identifier: string;
  code: string;
}

export interface AuthUserDto {
  id: number;
  identifier: string;
  role: string;
  isAdmin: boolean;
}

export interface BaseResponse {
  message: string;
}

export interface VerifyOtpResponse {
  token: string;
  user: AuthUserDto;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseUrl = `${environment.api}/Auth`; 
  private readonly isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

    // CHECKED TOKEN
    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    // SEND OTP
    sendOtp(request: SendOtpRequest): Observable<BaseResponse> {
        return this.http.post<BaseResponse>(`${this.baseUrl}/send-otp`, request);
    }

    // VERIFY OTP
    verifyOtp(request: VerifyOtpRequest): Observable<VerifyOtpResponse> {
        return this.http.post<VerifyOtpResponse>(`${this.baseUrl}/verify-otp`, request);
    }

    // LOGGED IN
    isLoggedIn(): boolean {
        return this.hasToken();
    }

    // LOG OUT
    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticated$.next(false);
        this.router.navigate(['/login']);
    }
}
