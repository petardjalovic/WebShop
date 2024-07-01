import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/Models/brands';
import { Product } from '../shared/Models/Products';
import { IType } from '../shared/Models/Producttype';
import { ShopParams } from '../shared/Models/ShopParams';
import { ShopService } from './shop.service';
import { NgxPaginationModule } from 'ngx-pagination'; //
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;

  totalcount!: number;
  paginator!: NgxPaginationModule;
  products!: Product[];
  brands!: Brand[];
  types!: IType[];
  totalCount!: any;
  shoparams: ShopParams = {
    brandId: 0,
    typeId: 0,
    sort: 'name',
    pageNumber: 1,
    pageSize: 6,
    pageCount: 20,
    search: '',

  };
  sortOptions?= [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price:Low to high', value: 'priceAsc' },
    { name: 'Price High to low', value: 'priceDesc' }
  ];
  constructor(private ShopService: ShopService) { }

  ngOnInit(): void {

    this.loadProducts();
    this.loadBrands();
    this.loadTypes();


  }
  loadProducts() {
    this.ShopService.getProducts(this.shoparams).subscribe(response => {
      this.products = response!.data;

      this.shoparams.pageNumber != response?.pageIndex;
      this.shoparams.pageSize != response?.pageSize;
      this.totalCount = response?.pageCount;

    }, error => {
      console.log(error);
    })

  }
  loadBrands() {
    this.ShopService.getBradnds().subscribe(resBrandsData => {
      this.brands = [{ id: 0, name: 'All' }, ...resBrandsData];
    }, error => {
      console.log(error, this.brands);
    });

  }
  loadTypes() {
    this.ShopService.getTypes().subscribe(resTypesData => {
      this.types = [{ id: 0, name: 'All' }, ...resTypesData];
    }, error => {
      console.log(error);
    });
  }
  onBrandSelected(brandId: number) {
    this.shoparams.brandId = brandId;
    this.shoparams.pageNumber = 1;
    this.loadProducts();
  }
  onTypeSelected(typeId: number) {
    this.shoparams.typeId = typeId;
    this.loadProducts();
  }
  onSortSelected($event: any) {
    this.shoparams.sort = $event.target.value;
    this.loadProducts();
  }
  onPageChanged($event: PageChangedEvent) {
    this.shoparams.pageNumber = $event.page;
    this.loadProducts();
  }
  onSearch() {
    this.shoparams.search = this.searchTerm.nativeElement.value;
    this.loadProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.shoparams = new ShopParams();
    this.loadProducts();
  }
}
