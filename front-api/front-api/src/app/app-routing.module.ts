import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { UserLoginComponent } from './view/user-login/user-login.component';
import { ProductsComponent } from './view/products/products.component';
import { OrdersComponent } from './view/orders/orders.component';
import { CustomersComponent } from './view/customers/customers.component';
import { UserRegisterComponent } from './view/user-register/user-register.component';
import { UserDetailsComponent } from './view/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'products',
    component:ProductsComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'customers',
    component:CustomersComponent
  },
  {
    path: 'register',
    component:UserRegisterComponent
  },
  {
    path: 'details',
    component:UserDetailsComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
