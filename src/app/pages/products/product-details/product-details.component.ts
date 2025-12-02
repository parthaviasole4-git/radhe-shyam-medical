import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { getUserIdFromToken } from '../../../helper/jwt.helper';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  userId = getUserIdFromToken();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id')
    this.productService.getById(id).subscribe((response) => {
      this.product = response
    });
  }

  addToCart() {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
      return
    }

    this.cartService.addToCart({ userId: this.userId, productId: this.product.id, qty: 1, price: this.product.price  }).subscribe(() => {
      this.cartService.getCart(this.userId).subscribe();
    });
  }
}
