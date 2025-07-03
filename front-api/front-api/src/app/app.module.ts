import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { UserLoginComponent } from './view/user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './view/user-register/user-register.component';
import { UserDetailsComponent } from './view/user-details/user-details.component';
import { ProductsComponent } from './view/products/products.component';
import { CustomersComponent } from './view/customers/customers.component';
import { OrdersComponent } from './view/orders/orders.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserDetailsComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
