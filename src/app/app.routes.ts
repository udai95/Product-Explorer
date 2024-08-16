import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ProductsComponent } from './modules/products/products.component';
import { AuthGuard } from './core/guards/auth-guard';
import { CartComponent } from './modules/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
];
