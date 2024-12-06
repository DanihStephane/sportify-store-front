import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://127.0.0.1:3000/product/findAll';
  private apiUrlSearch = 'http://127.0.0.1:3000/product/search';

  constructor(private http: HttpClient) {}

  getProduits(page: number, limit: number = 20, terms: string = 'artificiose'): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}?terms=${terms}&page=${page}&limit=${limit}`);
  }

  searchProducts(terms: string ='', page: number = 1, limit: number = 20): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrlSearch}?terms=${terms}`);
  }
}
