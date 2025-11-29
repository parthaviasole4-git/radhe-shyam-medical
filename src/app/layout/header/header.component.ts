import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { getIsAdminFromToken, getUserIdFromToken } from '../../helper/jwt.helper';
import { AuthService } from '../../core/services/auth.service';

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
export class HeaderComponent implements OnInit {

  cartCount = 0;
  userId = getUserIdFromToken();
  isAdmin = getIsAdminFromToken();

  constructor(private readonly cartService: CartService, private readonly authService: AuthService) { }

  ngOnInit() {

    if(!this.authService.isLoggedIn() || this.isAdmin == 'True') 
      return

    this.cartService.init(this.userId);
    this.cartService.cartCount.subscribe(n => this.cartCount = n);
  }

}
