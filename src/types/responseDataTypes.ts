/* DeliveryAddress */
export interface DeliveryDataType {
  memberAddressId: string;
  addressNickname: string;
  receiverName: string;
  mainAddress: string;
  subAddress: string;
  zoneCode: string;
  phoneNumber: string;
  isDefaultAddress: boolean;
}

export interface signInDataType {
  accessToken: string;
  refreshToken: string;
}

/* Carts */
export interface CartDatasType {
  totalPages: number;
  totalElements: number;
  productDetails: CartItemDataType[];
}

export interface CartItemDataType {
  cartId: number;
  checked: boolean;
  productCode: number;
  quantity: number;
  productDetailCode: number;
  carvingContent: string;
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

export interface ProductOptionsType {
  options: ProductOptionDataType;
}

export type SizeOptionType = {
  sizeId: number;
  sizeName: string;
};

export type ColorOptionType = {
  colorId: number;
  colorName: string;
};

export interface ProductOptionDataType {
  size: SizeOptionType[];
  color: ColorOptionType[];
}

export interface AddressDataType {
  memberAddressUuid: string;
  addressNickname: string;
  receiverName: string;
  address: string;
  zoneCode: string;
  isDefaultAddress: boolean;
  detailAddress: string;
  phoneNumber: string;
}

export interface AddressListDataType {
  deliveryAddresses: AddressDataType[];
}
