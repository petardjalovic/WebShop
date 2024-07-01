import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { IBasket } from '../shared/Models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$! :Observable<any>;
  basket! : IBasket ;
  constructor(private basketService:BasketService) { }

  ngOnInit() {
    this.basket$=this.basketService.basket$;
  }
removebasketitem(item:any){
  this.basketService.removeItemFromBasket(item);
}
increment(item:any){
  this.basketService.incrementItemQuantity(item);

}
descitem(item:any){
  this.basketService.decrementItemQuantity(item);
}
}
