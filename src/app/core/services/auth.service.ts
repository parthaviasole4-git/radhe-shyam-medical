// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { delay, tap } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//     private readonly AUTH_KEY = 'auth_token';

//     private _isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

//     isAuthenticated$ = this._isAuthenticated$.asObservable();

//     constructor(private router: Router) { }

//     // Call this with email or phone to trigger OTP sending
//     requestOtp(identifier: string): Observable<void> {
//         // TODO: Replace with real HTTP call
//         console.log('Requesting OTP for', identifier);
//         return of(void 0).pipe(delay(800)); // simulate API
//     }

//     // Verify the 6-digit OTP
//     verifyOtp(otp: string): Observable<boolean> {
//         // TODO: Replace with real HTTP call
//         const isValid = otp === '123456' || otp.length === 6; // demo only
//         return of(isValid).pipe(
//             delay(800),
//             tap(valid => {
//                 if (valid) {
//                     localStorage.setItem(this.AUTH_KEY, 'dummy-token');
//                     this._isAuthenticated$.next(true);
//                 }
//             })
//         );
//     }

// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { BehaviorSubject } from 'rxjs';
// import { Router } from '@angular/router';

// export interface SendOtp {
//     identifier: string;
// }

// export interface LoginRequest {
//     identifier: string;
//     code: string;
// }

// export interface LoginResponse {
//     token: string;
//     refreshToken?: string;
//     expiresIn: number;
//     user: any;
// }

// export interface RefreshTokenResponse {
//     token: string;
//     refreshToken: string;
//     expiresIn: number;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
    
//     private readonly base = `${environment.api}/Auth`;
//     private readonly  _isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
//     private readonly AUTH_KEY = 'token';

//     constructor(private readonly http: HttpClient, private readonly router: Router) { }

//     private hasToken(): boolean {
//         return !!localStorage.getItem('token');
//     }

//     requestOtp(data: SendOtp) {
//         return this.http.post<LoginResponse>(`${this.base}/send-otp`, data);
//     }

//     login(data: LoginRequest) {
//         return this.http.post<LoginResponse>(`${this.base}/verify-otp`, data);
//     }

//     refreshToken() {
//         return this.http.get<RefreshTokenResponse>(`${this.base}/refresh`);
//     }

//     getProfile() {
//         return this.http.get(`${this.base}/me`);
//     }

//     isLoggedIn(): boolean {
//         return this.hasToken();
//     }

//     logout(): void {
//         localStorage.removeItem(this.AUTH_KEY);
//         this._isAuthenticated$.next(false);
//         this.router.navigate(['/login']);
//     }
// }

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
