import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { BasketService } from '../basket/basket.service';
import { IBasket } from '../shared/Models/basket';
import { CheckoutService } from './checkout.service';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup | any;
  errors! : string[] ;
  deliveryMethods!: IDeliveryMethod[];

  constructor(private fb: FormBuilder, private basketservice: BasketService, private checkoutservice: CheckoutService, private toaster: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.getdeliveryMethod();
    this.basketservice.GetCurentBasketValue();
  }

  onSubmit() {
    const basket = this.basketservice.GetCurentBasketValue();
    const order = this.getordertocr(basket!);
    console.log(order);
    this.checkoutservice.createOrder(order).subscribe(response => {
      this.toaster.success('order created')
    }, error => {
      console.log(error);
    });

  }
  createForm() {
    this.checkoutForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      street: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
      deliveryMethod: [null, [Validators.required]]
    })
  }
  getdeliveryMethod() {
    this.checkoutservice.getdelivery().subscribe(res => {
      this.deliveryMethods = res;
    }, error => {
      console.log(error);
    })
  }




  getordertocr(basket: IBasket) {
    return {
      basketId: basket?.id,
      deliveryMethodid: this.checkoutForm.get('deliveryMethod')?.value,
      adress: {
        firstName: this.checkoutForm.get('firstName')?.value,
        lastName: this.checkoutForm.get('lastName')?.value,
        street: this.checkoutForm.get('street')?.value,
        city: this.checkoutForm.get('city')?.value,
        state: this.checkoutForm.get('state')?.value,
        zipCode: this.checkoutForm.get('zipcode')?.value,
      }
    };
  }


}