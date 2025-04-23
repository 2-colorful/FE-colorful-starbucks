'use server';

import {
  OrderRequestType,
  PreOrderRequestType,
} from '@/types/requestDataTypes';
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

export const createOrder = async (data: OrderRequestType) => {
  try {
    await instance.post('/orders', {
      requireAuth: true,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('🚀 ~ createOrder ~ error:', error);
    throw error;
  }
};
