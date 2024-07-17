import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = 'https://localhost:7158/api/';
  constructor(private http: HttpClient) { }
  getOrdersForUser() {
    return this.http.get<any[]>(this.baseUrl + 'OrdersContorler');
  }
  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'OrdersContorler/' + id);
  }
}
