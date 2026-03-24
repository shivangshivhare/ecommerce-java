import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {private baseUrl = "http://localhost:8080/product";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  save(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  update(product: any) {
  return this.http.put(`${this.baseUrl}/${product.id}`, product);
}

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  search(text: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?query=${text}`);
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}