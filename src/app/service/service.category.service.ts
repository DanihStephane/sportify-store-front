import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse, Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:3000/category/getAll';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}`);
  }
}
