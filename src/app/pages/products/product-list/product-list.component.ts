import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

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
export class ProductListComponent {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit() {
    // Load products from service
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation(); // stop card click

    this.cartService.addToCart(product);

    // Toast popup
    this.msg.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: product.name,
      life: 1300
    });

    // button pulse animation
    const target = event.target as HTMLElement;
    target.classList.add('pulse');
    setTimeout(() => target.classList.remove('pulse'), 250);
  }
}

