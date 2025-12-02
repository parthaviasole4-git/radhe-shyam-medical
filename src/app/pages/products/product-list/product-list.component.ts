import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { getUserIdFromToken } from '../../../helper/jwt.helper';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  userId = getUserIdFromToken();

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly msg: MessageService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCart(product: any, event: Event) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
      return
    }
    event.stopPropagation();

    this.cartService.addToCart({ userId: this.userId, productId: product.id, qty: 1, price: product.price }).subscribe(() => {
      this.msg.add({ severity: 'success', summary: 'Added to Cart', detail: product.name, life: 1300 });
    });

    const btn = event.target as HTMLElement;
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 250);
  }
}

