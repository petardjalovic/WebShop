export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productTypeId: number;
    productBrandId: number;
  }

  export class ProductFormValues implements IProductCreate {
    name = '';
    description = '';
    price = 0;
    pictureUrl = '';
    productBrandId = 1 ;
    productTypeId = 1;
  
    constructor(init?: ProductFormValues) {
      Object.assign(this, init);
    }
}