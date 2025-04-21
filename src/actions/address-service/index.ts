'use server';
import { revalidateTag } from 'next/cache';

import {
  CreateAddressDataType,
  UpdateAddressDataType,
  UpdateDefaultAddressDataType,
} from '@/types/requestDataTypes';
import { instance } from '../instance';
import {
  AddressDataType,
  AddressListDataType,
} from '@/types/responseDataTypes';
import { ADDRESS_DETAIL_TAG, ADDRESS_TAG } from '@/data/tagDatas';

export const getDeliveryAddresses = async () => {
  try {
    const res = await instance.get<AddressListDataType>(`/delivery/addresses`, {
      requireAuth: true,
      tags: [ADDRESS_TAG],
      cache: 'force-cache',
    });

    return res.data.deliveryAddresses;
  } catch (error) {
    throw error;
  }
};

export const getDetailDeliveryAddress = async (memberAddressUuid?: string) => {
  if (!memberAddressUuid) return;

  try {
    const res = await instance.get<AddressDataType>(
      `/delivery/${memberAddressUuid}`,
      {
        requireAuth: true,
        cache: 'force-cache',
        tags: [ADDRESS_DETAIL_TAG],
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDefaultDeliveryAddress = async () => {
  try {
    const res = await instance.get<AddressDataType>(
      '/delivery/default-address',
      {
        requireAuth: true,
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateDefaultAddress = async (
  data: UpdateDefaultAddressDataType,
) => {
  try {
    await instance.put('/delivery/default-address', {
      requireAuth: true,
      body: JSON.stringify([data]),
    });
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (
  memberAddressUuid: string,
  data: UpdateAddressDataType,
) => {
  try {
    await instance.put(`/delivery/address/${memberAddressUuid}`, {
      requireAuth: true,
      body: JSON.stringify(data),
    });

    revalidateTag(ADDRESS_TAG);
    revalidateTag(ADDRESS_DETAIL_TAG);
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (memberAddressUuid: string) => {
  try {
    await instance.delete(`/delivery/address/${memberAddressUuid}`, {
      requireAuth: true,
    });

    revalidateTag(ADDRESS_TAG);
  } catch (error) {
    throw error;
  }
};

export const allDeleteAddress = async () => {
  try {
    await instance.delete(`/delivery/addresses`, {
      requireAuth: true,
    });
  } catch (error) {
    throw error;
  }
};

export const createDeliveryAddress = async (data: CreateAddressDataType) => {
  try {
    await instance.post('/delivery/address', {
      requireAuth: true,
      body: JSON.stringify(data),
    });

    revalidateTag(ADDRESS_TAG);
  } catch (error) {
    throw error;
  }
};
