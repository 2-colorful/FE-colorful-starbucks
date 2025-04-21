export interface SearchParamsType {
  topCategoryId?: string;

  bottomCategoryIds?: string | string[];

  minPrice?: string;
  maxPrice?: string;

  sortBy?: string;

  cursor?: string;
  size?: string;

  page?: string;

  [key: string]: string | string[] | undefined;
}
