import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import User from '../model/user';
import { Variables } from '../config/variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL : string = Variables.apiURL;

  constructor(private http: HttpClient) { }

  createSession(user: User) : Observable<any>{
    return this.http.post(`${this.apiURL}/sessions` , user);
  }

  createUser(user: User) : Observable<User>{
    return this.http.post<User>(`${this.apiURL}/users` , user);
  }
}
