import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IordertoCreate } from '../shared/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  createOrder (order : any){
return this.http.post(this.baseUrl + 'OrdersContorler', order);
  }

  getdelivery(){
    return this.http.get<any>(this.baseUrl + 'OrdersContorler/deliveryMethods' );
  }

}
