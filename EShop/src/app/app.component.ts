import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private basketService: BasketService, private Accservice :AccountService) { }

  ngOnInit(): void {
this.loadBasket();
this.loadCurentUser();
  }

loadCurentUser(){
  const token = localStorage.getItem('token');
  if(token){
    this.Accservice.loadCurentUser(token).subscribe(()=>{
      console.log('loaded user')
    },error =>{
      console.log(error);
    }
    )
  }
}

loadBasket(){
  const basketId = localStorage.getItem('basket_id');
  if (basketId) {
    this.basketService.getBasket(basketId).subscribe(() => { console.log('initialized basket') }
      , error => {
        console.log(error);
      });
  }
}
}
