'use server';

import { CouponDataType, CouponListDataType } from '@/types/responseDataTypes';
import { instance } from '../instance';

export const getMemberCoupon = async (
  page: number = 0,
  size: number = 5,
  cursor?: number,
) => {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor.toString());
  params.append('page', page.toString());
  params.append('size', size.toString());

  try {
    const res = await instance.get<CouponListDataType>(
      `/member-coupons?${params.toString()}`,
      {
        requireAuth: true,
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponDetail = async (couponUuid?: string) => {
  if (!couponUuid) return;

  try {
    const res = await instance.get<CouponDataType>(`/coupons/${couponUuid}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};
