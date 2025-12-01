import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/orders.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, CardModule, TableModule, ButtonModule, RouterModule, TagModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private readonly service: OrderService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.orders = res;
    });
  }
}

