import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private baseUrl = "http://localhost:8080/cart";

  constructor(private http: HttpClient) {}

  addToCart(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProd`, data);
  }

  getCart(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }

  updateQty(id: number, qty: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateQty/${id}?qty=${qty}`, {});
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}