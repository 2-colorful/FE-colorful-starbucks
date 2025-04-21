export interface SearchProductItem {
  productCode: number;
  id: number;
  price: number;
  createdAt: string;
}

export interface SearchUrlParams {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  size?: string;
}

export interface SearchApiParams {
  query?: string;
  cursor?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: number;
  page?: number;
}

export interface SearchResponseType {
  content: SearchProductItem[];
  hasNext: boolean;
  nextCursor: number;
}
