import { Component , Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IProductCreate } from 'src/app/shared/Models/ProductCreate';
import {forkJoin} from 'rxjs';
import { Brand } from 'src/app/shared/Models/brands';
import { IType} from 'src/app/shared/Models/Producttype'

@Component({
  selector: 'app-product-addedit',
  templateUrl: './product-addedit.component.html',
  styleUrls: ['./product-addedit.component.css']
})
export class ProductAddeditComponent implements OnInit {

  brands!: Brand[];
  types!: IType[];
  product!: IProductCreate;
  editState! : boolean;

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    pictureUrl: new FormControl(''),
    productTypeId: new FormControl(''),
    productBrandId: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router, private service: AdminService) { }
  @Input() data: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const brands = this.getBrands();
    const types = this.getTypes();

    if (id != null) {
      this.loadDetails(Number(id));
      
     
    }
    else console.log(id);


    forkJoin([types, brands]).subscribe(results => {
      this.types = results[0];
      this.brands = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadDetails(Number (id));
      }
    });
  }
  onSubmit() {
    const updatedproduct = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      pictureUrl: this.productForm.value.pictureUrl,
      productTypeId: this.productForm.value.productTypeId,
      productBrandId: this.productForm.value.productBrandId
    };
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id != null) {
      this.service.updateProduct(updatedproduct, id!).subscribe((response: any) => {
        alert("product Updated succesfuly");
      });
    }
    else {
      this.service.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert("product added succesfuly")
        },
        error: () => {
          alert("eror")
        }
      });
    }
  }
  loadDetails(id: number) {

    this.service.getProductid(Number(id)).subscribe(res => {
      const productBrandId = Number(this.brands && this.brands.find(x=>x.name==res.productBrand)?.id);
      const productTypeId = Number(this.types && this.types.find(x => x.name === res.productType)?.id);
      this.product = {...res, productBrandId, productTypeId}

    }, error => {
      console.log(error);
    });
  }
  getBrands() {
    return this.service.getBradnds();
  }
  getTypes(){
    return this.service.getTypes();
  }
  
}
