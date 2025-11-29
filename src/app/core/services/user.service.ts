import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Address {
  house: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
}

export interface UserDto {
  id: string;
  identifier: string;
  role: string;
  isAdmin: boolean;
  createdAt: string;
  displayName?: string;
  phone?: string;
  address?: Address;
}

export interface CompleteProfileDto {
  displayName: string;
  phone: string;
  email: string;
  address: Address;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly base = `${environment.api}/User`;

  constructor(private readonly http: HttpClient) { }

  // GET USER BY ID
  getById(id: string): Observable<UserDto> {
    return this.http.get<any>(`${this.base}/${id}`);
  }

  // COMPLETE PROFILE
  completeProfile(userId: string, completeProfileDto: CompleteProfileDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.base}/complete-profile/${userId}`, completeProfileDto);
  }
}
