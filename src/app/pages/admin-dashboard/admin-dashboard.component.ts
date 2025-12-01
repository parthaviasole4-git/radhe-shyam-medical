import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../core/services/orders.service';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    RouterModule,
    RippleModule,
    ButtonModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

   stats = {
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    users: 0
  };

  latestOrders: any[] = [];

  constructor(
    private readonly ordersService: OrderService,
    private readonly adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ordersService.getAll().subscribe((orders: any[]) => {
      this.stats.totalOrders = orders.length;
      this.stats.pendingOrders = orders.filter(x => x.status !== 'Delivered').length;
      this.stats.deliveredOrders = orders.filter(x => x.status === 'Delivered').length;

      this.latestOrders = orders.slice(0, 5);
    });

    this.adminService.getAll().subscribe((users: any[]) => {
      this.stats.users = users.length;
    });
  }

}
