import { Product } from "./Products";

export class Pagination {

    pageIndex: number = 1;
    pageSize: number = 6;
    pageCount: number = 1;
    data: Product[] = [];
}