import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminDto {
  id: string;
  identifier: string;
  displayName: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  role: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly base = `${environment.api}/admin`;

  constructor(private readonly http: HttpClient) { }

  // ADMIN — GET ALL Users
  getAll(): Observable<AdminDto[]> {
    return this.http.get<AdminDto[]>(`${this.base}/users`);
  }

}

