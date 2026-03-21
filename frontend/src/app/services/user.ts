import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl = "http://localhost:8080/user";

  constructor(private http: HttpClient) {}

  register(user: User){
 return this.http.post<User>(this.baseUrl, user);
  }

  login(data: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }
 update(user: any): Observable<any> {
  return this.http.put(`${this.baseUrl}`, user);
}


  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}