import {IPaginationFields} from "./pagination";

export interface ISearchFields extends IPaginationFields {
  query: string;
}
