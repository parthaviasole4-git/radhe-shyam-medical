import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getIsAdminFromToken } from '../../helper/jwt.helper';

@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
})
export class BottomNav implements OnInit {

  isAdmin = getIsAdminFromToken();

  items = [
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Medicines', icon: 'pi pi-briefcase', route: '/products' },
    { label: 'Orders', icon: 'pi pi-list', route: '/orders' },
    { label: 'Profile', icon: 'pi pi-user', route: '/profile' },
  ];

  ngOnInit() {
    if (this.isAdmin == 'True') {
      this.items = [
        { label: 'Home', icon: 'pi pi-home', route: '/admin/dashboard' },
        { label: 'Users', icon: 'pi pi-users', route: '/admin/users' },
        { label: 'Orders', icon: 'pi pi-list', route: '/admin/orders' },
        { label: 'Profile', icon: 'pi pi-user', route: '/profile' },
      ]
    }
  }
}
