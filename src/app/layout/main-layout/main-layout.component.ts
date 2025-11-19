import { Component } from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';
import { HeaderComponent } from '../header/header.component';
import { BottomNav } from '../bottom-nav/bottom-nav.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BottomNav, LoaderComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  constructor(private router: Router, private loader: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.loader.hide(), 200);
      }
    });
  }
}
