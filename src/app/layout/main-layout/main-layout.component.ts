import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BottomNav } from '../bottom-nav/bottom-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, BottomNav, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
