import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export interface IBasket {
id: string;
items: IbasketItem[];
}

export interface IbasketItem {
id: number;
productName?: string;
price: number;
quantity: number;
pictureUrl: string;
brand: string;
type: string;

}
export class Basket implements IBasket{
    id = uuidv4();
    items: IbasketItem[]=[];
    
}
export interface IbasketTotal {
    shipping :number ;
    subtotal : number;
    total : number; 
}
