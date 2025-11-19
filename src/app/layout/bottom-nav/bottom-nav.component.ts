import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
})
export class BottomNav {

  items = [
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Medicines', icon: 'pi pi-briefcase', route: '/products' },
    { label: 'Orders', icon: 'pi pi-list', route: '/orders' },
    { label: 'Profile', icon: 'pi pi-user', route: '/profile' },
  ];
}
