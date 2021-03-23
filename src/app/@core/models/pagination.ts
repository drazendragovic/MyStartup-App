export interface Pagination {
  pageNumber?: number;
  pageSize?: number;
  currentPage?: number;
  totalNumber?: number;
}

export class PaginationQuery {
  pageNumber?: number;
  pageSize?: number;
}

export class PaginatedResult<T> {
  data!: T;
  pagination!: Pagination;
}
