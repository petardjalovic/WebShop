import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/basket';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private basketService : BasketService,private accService : AccountService) { }
  faCoffee='faCoffee';
 basket$! :Observable<any>;
 basket! : IBasket ;
 currentuser$!:Observable<any>;
  ngOnInit()  {
    this.basket$ = this.basketService.basket$;
   this.currentuser$=this.accService.currentuser$;
  }
  logout(){
    this.accService.logout();
  }

}

