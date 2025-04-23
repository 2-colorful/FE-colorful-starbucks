export interface ProductTypes {
  productCode: number;
  productName: string;
  description: string;
  productThumbnailUrl: string;
  productImageUrl: string;
  markable: boolean;
  price: number;
}

export interface ProductItem {
  id: number;
  productCode: number;
}

export interface ProductListDataType {
  content: ProductItem[];
  hasNext: boolean;
  nextCursor: string | null;
}

export type RecentlyViewedProductItem = {
  productCode: number;
  productThumbnailUrl?: string;
};

export type DailyRecentlyViewedProductsType = {
  viewedAt: string;
  recentlyViewProducts: RecentlyViewedProductItem[];
};

export type ProductDetailResponseType = {
  productDetailCode: number;
  productCode: number;
  sizeName: string;
  colorName: string;
  inventoryQuantity: number;
  price: number;
  discountPrice: number;
  productDetailThumbnailUrl: string;
};

export type FilteredProductsDataType = {
  productCode: number;
};

export type PaginatedResponseType = {
  content: FilteredProductsDataType[];
  hasNext: boolean;
  nextCursor: number;
};

export type SimpleProduct = {
  productName: string;
  productCode: number;
  productThumbnailUrl: string;
  price: number;
  isNew: boolean;
};

export type RecentlyProductUrlType = {
  productThumbnailUrl: string;
};
