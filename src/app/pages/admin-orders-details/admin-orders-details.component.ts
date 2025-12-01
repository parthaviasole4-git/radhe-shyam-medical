import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../core/services/orders.service';

@Component({
  selector: 'app-admin-orders-details',
   imports: [
    CommonModule,
    RouterModule,
    CardModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './admin-orders-details.component.html',
  styleUrl: './admin-orders-details.component.css'
})
export class AdminOrdersDetailsComponent implements OnInit {

  orderId!: string;
  order: any;

  constructor( 
    private readonly route: ActivatedRoute, 
    private readonly router: Router,
    private readonly orderService: OrderService) {
    this.orderId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.orderService.getOrder(this.orderId).subscribe((res: any) => {
      this.order = res;
    });
  }

  markOutofDilivery(){
    this.orderService.markOutOfDelievery(this.orderId).subscribe(()=>{
      this.router.navigate(['/admin/verify-otp/'+ this.orderId]);
    })
  }

  verifyOtp(){
    this.router.navigate(['/admin/verify-otp/'+ this.orderId]);
  }

}
