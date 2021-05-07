import {ISearchDto} from "./search";

export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export interface IOrderDto<T> extends ISearchDto {
  order: OrderDirection;
  orderBy: keyof T;
}
