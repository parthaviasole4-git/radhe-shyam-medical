import { Routes } from '@angular/router';

/* LAYOUT */
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

/* AUTH */
import { LoginComponent } from './pages/auth/login/login.component';

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
import { OrderTrackingComponent } from './pages/orders/order-tracking/order-tracking.component';


/* OPTIONAL GUARDS */
import { authGuard } from './core/guard/auth.guard';
import { OtpComponent } from './pages/auth/login/otp/otp.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminOrdersDetailsComponent } from './pages/admin-orders-details/admin-orders-details.component';
import { OrderVerifyOtpComponent } from './pages/order-verify-otp/order-verify-otp.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminUsersDetailsComponent } from './pages/admin-users-details/admin-users-details.component';
import { adminGuard } from './core/guard/admin.guard';
// import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [

  /* AUTH ROUTES */
  { 
    path: 'login', 
    component: LoginComponent,
    // canActivate: [guestGuard]
  },
   { 
    path: 'otp', 
    component: OtpComponent,
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
        canActivate: [authGuard]
      },
      {
        path: 'payment',
        component: PaymentComponent,
        // canActivate: [authGuard]
      },
      {
        path: 'payment-success',
        component: PaymentSuccessComponent,
        canActivate: [authGuard]
      },

      /* ORDERS + PROFILE */
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard]
      },
      {
        path: 'track/:id',
        component: OrderTrackingComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
      },

      /* ORDERS + PROFILE */
      {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'admin/orders/:id',
        component: AdminOrdersDetailsComponent,
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'admin/verify-otp/:id',
        component: OrderVerifyOtpComponent,
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'admin/users/:id',
        component: AdminUsersDetailsComponent,
        canActivate: [authGuard, adminGuard]
      },
    ]
  },

  { path: '**', redirectTo: '' }
];

