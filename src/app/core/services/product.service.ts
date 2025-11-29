import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private readonly base = `${environment.api}/products`;

  constructor(private readonly http: HttpClient) {}

  // GET ALL PRODUCTS
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}`);
  }

  // GET PRODUCT BY ID
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  // CREATE MULTIPLE PRODUCTS
  getByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/by-code/${code}`);
  }
}


