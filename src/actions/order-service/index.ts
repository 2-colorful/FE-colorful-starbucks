'use server';

import { instance } from '../instance';
import type { PreOrderRequestType } from '@/types/requestDataTypes';
import type { PreOrderDataType } from '@/types/responseDataTypes';

export const createPreOrder = async (data: PreOrderRequestType) => {
  try {
    const res = await instance.post<PreOrderDataType>('/orders/pre', {
      requireAuth: true,
      body: JSON.stringify(data),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
