import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IbasketTotal } from '../Models/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.css']
})
export class OrderTotalComponent {

  basketTotal$ !:Observable<any>;
  basketTotal! : IbasketTotal;
  subtotal :number=0;
  total:number=0;
  shipping:number=0;
  constructor( private basketService :BasketService) { }
  ngOnInit(){
    this.basketTotal$=this.basketService.basketTotal$;
    
    } 
    loadtotal(){
   
    }
}
