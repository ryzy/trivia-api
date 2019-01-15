export interface Paged<T> {
  items: T[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  totalCount: number;
  page: number;
  pageSize: number;
}

export function makePagedResult<T>(
  items: T[],
  totalCount: number = 0,
  page: number = 1,
  pageSize: number = 10,
): Paged<T> {
  return {
    pageInfo: {
      totalCount,
      page,
      pageSize,
    },
    items,
  };
}
