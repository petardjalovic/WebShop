import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/Models/Products';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity :number = 1;
 
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService,private basketService :BasketService) 
  { this.bcService.set('@productDetails', '') }

  ngOnInit(): void {
    this.loadProduct();
  }
addToBasket(){
  this.basketService.addItemtoBasket(this.product,this.quantity);
}
increQua(){
console.log(this.quantity);
this.quantity++;
console.log(this.quantity);
}
decQua(){
  if (this.quantity>1){
    this.quantity--;
  }
  
}

  loadProduct() {
    this.shopService.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }
}