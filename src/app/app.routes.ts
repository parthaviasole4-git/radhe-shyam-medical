import { Routes } from '@angular/router';

/* LAYOUT */
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

/* AUTH */
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

/* PAGES */
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';

/* OPTIONAL GUARDS */
// import { authGuard } from './core/guards/auth-guard';
// import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [

  /* AUTH ROUTES */
  { 
    path: 'login', 
    component: LoginComponent,
    // canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    // canActivate: [guestGuard]
  },

  /* APP ROUTES WITH MAIN LAYOUT */
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },

      /* PRODUCTS */
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailsComponent },

      /* CART, CHECKOUT, PAYMENT */
      { path: 'cart', component: CartComponent },
      { 
        path: 'checkout', 
        component: CheckoutComponent,
        // canActivate: [authGuard]
      },
      {
        path: 'payment',
        component: PaymentComponent,
        // canActivate: [authGuard]
      },
      {
        path: 'payment-success',
        component: PaymentSuccessComponent,
        // canActivate: [authGuard]
      },

      /* ORDERS + PROFILE */
      {
        path: 'orders',
        component: OrdersComponent,
        // canActivate: [authGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [authGuard]
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

