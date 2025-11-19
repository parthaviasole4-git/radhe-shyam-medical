import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, CardModule, ButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
  slides = [
    { img: 'https://cdn.pixabay.com/photo/2016/12/05/19/49/syringe-1884784_1280.jpg' },
    { img: 'https://cdn.pixabay.com/photo/2020/03/03/04/52/pill-4897529_1280.jpg' },
    { img: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_1280.jpg' },
  ];

  categories = [
    { icon: 'pi pi-heart-fill', label: 'Pain Relief' },
    { icon: 'pi pi-sun', label: 'Fever Medicines' },
    { icon: 'pi pi-cloud', label: 'Cold & Cough' },
    { icon: 'pi pi-star', label: 'Vitamins' }
  ];

  products: any[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}

