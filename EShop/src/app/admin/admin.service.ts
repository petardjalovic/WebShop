import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://localhost:7158/api/';
  adminurl = 'https://localhost:7158/api/Products/all';
  constructor(private http: HttpClient) { }
  getProduct() {
    return this.http.get<Product[]>(this.adminurl);
  }
  getProductid(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id)
  }
  getBradnds() {
    return this.http.get<any[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<any[]>(this.baseUrl + 'products/types');
  }
  postProduct(data: any) {
    return this.http.post(this.baseUrl + 'products', data);
  }
  updateProduct(data: any, id: number | string) {
    return this.http.put(this.baseUrl + `products/${id}`, data);
  }
  deleteProduct(id: number | string) {
    return this.http.delete(this.baseUrl + `products/${id}`);
  }
}
