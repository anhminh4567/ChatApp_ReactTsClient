export type PagingResponse<T> = {
  TotalPage: number;
  CurrentPage: number;
  Values: T[];
  TotalCount?: number;
  TotalTake?: number;
};
