import type { CheckedState } from '@radix-ui/react-checkbox';

export interface CartRuquestType {
  productCode: number;
  productDetailCode: string;
  carvingContent?: string;
  quantity: number;
}

export interface UpdateCartCheckedType {
  id: number;
  checked: CheckedState;
}

export type DeleteCartItemType = {
  cartIds: { cartId: number }[];
};

export interface UpdateCartDataType {
  productCode: number;
  productDetailCode: number;
  quantity: number;
}

export interface UpdateDefaultAddressDataType {
  memberAddressUuid: string;
  defaultAddress: true;
}

export interface UpdateAddressDataType {
  addressNickname: string;
  receiverName: string;
  defaultAddress: boolean;
  zoneCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface CreateAddressDataType {
  addressNickname: string;
  receiverName: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}
