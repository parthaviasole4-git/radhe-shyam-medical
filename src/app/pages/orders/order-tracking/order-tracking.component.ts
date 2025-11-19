import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, TimelineModule, ButtonModule],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {

  order: any;

  steps = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  constructor() {
    const nav = history.state;
    this.order = nav.order;
  }

  getTrackingSteps() {
    const currentIndex = this.steps.indexOf(this.order?.status);
    return this.steps.map((label, i) => ({
      label,
      done: i <= currentIndex
    }));
  }

  goBack() {
    history.back();
  }
}
