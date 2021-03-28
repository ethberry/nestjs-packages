import {ISearchFields} from "./search";

export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export interface IOrderFields<T> extends ISearchFields {
  order: OrderDirection;
  orderBy: keyof T;
}
