'use server';

import {
  BestProductsCategoriesType,
  BestProductType,
} from '@/types/products/bestProductTypes';
import { instance } from '../instance';

export const getBestProductsCategories = async () => {
  try {
    const response = await instance.get<{
      categories: BestProductsCategoriesType[];
    }>(`/products/best/categories`, {
      requireAuth: false,
      revalidate: 60 * 60 * 24,
    });

    return response.data.categories;
  } catch (error) {
    throw error;
  }
};

export const getBestProducts = async (topCategory: number) => {
  try {
    const response = await instance.get<{ bestProducts: BestProductType[] }>(
      `
        /products/best?${topCategory}`,
      {
        requireAuth: false,
        revalidate: 60 * 60 * 24,
      },
    );
    return response.data.bestProducts;
  } catch (error) {
    throw error;
  }
};
