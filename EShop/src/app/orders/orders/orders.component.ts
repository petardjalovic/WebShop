import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/Models/Order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  implements OnInit {
  orders: IOrder[] = [];


  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe(res => {
      this.orders = res ;
    }, error => {
      console.log(error);
    })
  }


}
