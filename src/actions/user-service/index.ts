'use server';

import { UserInfoType } from '@/types/user';
import { instance } from '../instance';

export const getUserInfo = async () => {
  try {
    const response = await instance.get<UserInfoType>(`/users/my-page`, {
      requireAuth: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
