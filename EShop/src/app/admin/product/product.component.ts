import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Product } from 'src/app/shared/Models/Products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private service: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.LoadProducts()
  }
  LoadProducts() {
    this.service.getProduct().subscribe(data => {
      this.products = data;
    })
  }
  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (res) => {
        alert("product Deleted succesfuly")
      }
    });

  }


}
