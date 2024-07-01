import { IAddress } from "./adress";

export interface IordertoCreate {

    basketId: string;
    deliveryMethodID: number;
    shiptoAddres: IAddress
}
export interface IOrder {
    id: number
    buyerEmail: string
    orderDate: string
    shipToAdress: IAddress
    deliveryMethod: string
    shippingPrice: number
    orderItems: IOrderItem[]
    subtotal: number
    total: number
    status: string
}



export interface IOrderItem {
    producId: number
    productName: string
    pictureUrl: string
    price: number
    quantity: number
}