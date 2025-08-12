import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  favoriteBook(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/${id}/favorite`, {});
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me/favorites`);
  }

  createBook(body: { title: string; author: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, body);
  }

  updateBook(id: string, body: { title: string; author: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/books/${id}`, body);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${id}`);
  }
}
