import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    BadgeModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartCount = 1 ;

  constructor(private readonly cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount.subscribe(n => this.cartCount = n);
  }

}
