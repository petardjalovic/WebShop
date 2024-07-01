import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket } from '../shared/Models/basket';
import { Product } from '../shared/Models/Products';
import { IbasketItem } from '../shared/Models/basket';
import { IbasketTotal } from '../shared/Models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  private basketTotalSource = new BehaviorSubject<IbasketTotal | null>(null);

  basketTotal$ = this.basketTotalSource.asObservable();
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: any) => {
          this.basketSource.next(basket);
          this.CalculateTotal();
        })
      );

  }
  incrementItemQuantity(item: any) {
    const basket = this.GetCurentBasketValue();
    const founditemIndex = basket?.items.findIndex(x => x.id === item.id);
    basket!.items[founditemIndex!].quantity++;
    this.setBasket(basket!);
  };

  decrementItemQuantity(item: any) {
    const basket = this.GetCurentBasketValue();
    const founditemIndex = basket?.items.findIndex(x => x.id === item.id);
    if (basket!.items[founditemIndex!].quantity > 1) {
      basket!.items[founditemIndex!].quantity--;
      this.setBasket(basket!);
    } else {
      this.removeItemFromBasket(item); 
    }
  };

  removeItemFromBasket(item: any) {
    const basket = this.GetCurentBasketValue();
    if (basket?.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
    } if (basket!.items.length > 0) {
      this.setBasket(basket!);
    }
    else {
      this.deleteBasket(basket);
    }
  }
  deleteLocalBasket(){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }


  deleteBasket(basket: any) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }



  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((res: any) => {
      this.basketSource.next(res);
      this.CalculateTotal();
    }, error => {
      console.log(error);
    });
  }
  GetCurentBasketValue() {
    return this.basketSource.value;
  }
  addItemtoBasket(item: Product, quantity = 1) {
    console.log(item)
    const itemToAdd: IbasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.GetCurentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpddateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  private addOrUpddateItem(item: IbasketItem[], itemToAdd: IbasketItem, quantity: number): IbasketItem[] {
    const index = item.findIndex(i => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quantity = quantity;
      item.push(itemToAdd);
    } else {
      item[index].quantity += quantity;
    }
    return item;

  }
  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: Product, quantity: number): IbasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }
  CalculateTotal() {
    const basket = this.GetCurentBasketValue();
    const shipping = 0;

    const subtotal = basket!.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });
    console.log(shipping, total, subtotal)
  };

}

