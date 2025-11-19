import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loader.loading | async" class="loader-overlay">
      <div class="dots">
        <div></div><div></div><div></div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
