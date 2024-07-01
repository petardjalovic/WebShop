import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../shared/Models/pagination';
import { Brand } from '../shared/Models/brands';
import { IType } from '../shared/Models/Producttype';
import { map } from 'rxjs';
import { ShopParams } from '../shared/Models/ShopParams';
import { Product } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7158/api/';
  constructor(private http: HttpClient) { }


  getProducts(ShopParams: ShopParams) {
    let params = new HttpParams();

    if (ShopParams.brandId !== 0) {
      params = params.append('brandId', ShopParams.brandId.toString());
    }
    if (ShopParams.typeId !== 0) {
      params = params.append('typeId', ShopParams.typeId.toString());
    }
    if (ShopParams.pageSize !== 0) {
      params = params.append('sort', ShopParams.sort)

    }
    if (ShopParams.pageNumber != 0) {
      params = params.set('pageIndex', ShopParams.pageNumber.toString());
    }
    if (ShopParams.search) {
      params = params.append('search', ShopParams.search);
    }

    params = params.append('pageSize', ShopParams.pageSize.toString());
    return this.http.get<Pagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;

        })
      );

  }
  getBradnds() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id)
  }

}
