export interface APIResponse<T> {
  result: T[];
  count: number;
  totalPages: number;
  size: number;
  pageNumber: number;
}
