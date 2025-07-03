import { Injectable } from '@angular/core';
import { Variables } from '../config/variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import Product from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiURL : string = Variables.apiURL;
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() : HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorizaton', `Bearer ${token}`)
  }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURL}/products`,
      {headers: this.getAuthHeaders()});
  }

    getProductById(id: string) : Observable<Product>{
    return this.http.get<Product>(`${this.apiURL}/products/${id}`,
      {headers: this.getAuthHeaders()});
  }

  addProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(`${this.apiURL}/products`, product,
      {headers: this.getAuthHeaders()});
  }

  updateProduct(id: string, product : Product) : Observable<Product>{
    return this.http.put<Product>(`${this.apiURL}/products`, product,
      {headers: this.getAuthHeaders()});
  }

  deleteProduct(id: string) : Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/products/${id}`,
      {headers: this.getAuthHeaders()});
  }
}