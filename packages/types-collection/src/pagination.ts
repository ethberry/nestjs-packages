export interface IPaginationFields {
  skip: number;
  take: number;
}

export interface IPaginationResult<T> {
  list: Array<T>;
  count: number;
}
