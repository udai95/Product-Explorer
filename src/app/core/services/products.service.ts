import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(
    limit: number,
    skip: number,
    sortBy: string,
    order: string
  ): Observable<any> {
    const url = `${this.apiUrl}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
    return this.http.get(url);
  }

  getProductsByCategory(
    category: string,
    limit: number,
    skip: number,
    sortBy: string,
    order: string
  ): Observable<any> {
    const url = `${this.apiUrl}/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }
}
