import { Injectable } from '@angular/core';
import { Variables } from '../config/variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Order from '../model/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL : string = Variables.apiURL;
    constructor(private http: HttpClient, private authService: AuthService) { }
  
    private getAuthHeaders() : HttpHeaders{
      const token = this.authService.getToken();
      return new HttpHeaders().set('Authorizaton', `Bearer ${token}`)
    }
  
    getAllorders() : Observable<Order[]>{
      return this.http.get<Order[]>(`${this.apiURL}/orders`,
        {headers: this.getAuthHeaders()});
    }
  
      getOrderById(id: string) : Observable<Order>{
      return this.http.get<Order>(`${this.apiURL}/orders/${id}`,
        {headers: this.getAuthHeaders()});
    }
  
    createOrder(order: Order) : Observable<Order>{
      return this.http.post<Order>(`${this.apiURL}/order`, order,
        {headers: this.getAuthHeaders()});
    }
  }
