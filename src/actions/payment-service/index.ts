'use server';

import { PreOrderRequestType } from '@/types/requestDataTypes';
import { instance } from '../instance';
import { PreOrderDataType } from '@/types/responseDataTypes';

export const createPreOrder = async (data: PreOrderRequestType) => {
  try {
    const res = await instance.post<PreOrderDataType>('/orders/pre', {
      body: JSON.stringify(data),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
