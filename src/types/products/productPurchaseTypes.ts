export interface SelectedOptionValueType {
  [key: string]:
    | {
        id: number;
        name: string;
      }
    | undefined;
}

export interface SelectedOptionType {
  id: string;
  options: SelectedOptionValueType;
  quantity: number;
}

export interface SizeOptionType {
  sizeId: number;
  sizeName: string;
}

export interface ColorOptionType {
  colorId: number;
  colorName: string;
}

export interface ProductOptionDataType {
  size?: SizeOptionType[];
  color?: ColorOptionType[];
}

export interface ProductDetailDataType {
  productDetailCode: number;
  productCode: number;
  sizeId: number | null;
  colorId: number | null;
  sizeName: string | null;
  colorName: string | null;
  price: number;
  inventoryQuantity: number;
  discountPrice: number;
  productThumbnailUrl: string;
}

export interface InventoryResponseType {
  productDetailCode: number;
  inventoryQuantity: number;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
