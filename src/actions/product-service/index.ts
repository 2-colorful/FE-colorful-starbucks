'use server';

import type { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import type { ProductCategoryTopType } from '@/types/products/productCategoryType';
import type {
  DailyRecentlyViewedProductsType,
  PaginatedResponseType,
  ProductTypes,
  SimpleProduct,
} from '@/types/products/productTypes';
import { instance } from '../instance';
import type {
  CategoryBottomResponseType,
  CategoryTopResponseType,
} from '@/types/products/categoryResponseTypes';
import type {
  ProductDetailDataType,
  ProductOptionDataType,
  ProductOptionsType,
} from '@/types/responseDataTypes';
import { buildQueryParams } from '@/lib/product/util';

export const getTopCategories = async (): Promise<
  CategoryTopResponseType[]
> => {
  try {
    const response = await instance.get<{
      categories: CategoryTopResponseType[];
    }>(`/top-categories`, {
      requireAuth: false,
      next: { revalidate: 60 * 60 * 24 },
    });
    return response.data.categories;
  } catch (error) {
    throw error;
  }
};

export const getBottomCategories = async (
  topCategoryId: number,
): Promise<CategoryBottomResponseType[]> => {
  try {
    const response = await instance.get<{
      categories: CategoryBottomResponseType[];
    }>(`/bottom-categories?topCategoryId=${topCategoryId}`, {
      revalidate: 60 * 60 * 24,
      requireAuth: false,
    });

    if (!response.data || !response.data.categories) {
      throw new Error('카테고리 데이터가 없습니다');
    }

    return response.data.categories;
  } catch (error) {
    console.error('하위 카테고리 조회 실패:', error);
    throw error;
  }
};
const fetchProducts = async (
  queryParams: URLSearchParams,
  errorMessage: string = '상품 데이터를 가져오는 중 오류 발생:',
  defaultCursor: number = 0,
): Promise<PaginatedResponseType> => {
  try {
    const response = await instance.get<PaginatedResponseType>(
      `/products?${queryParams.toString()}`,
      {
        requireAuth: false,
      },
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    return {
      content: [],
      hasNext: false,
      nextCursor: defaultCursor,
    };
  }
};

export const getInitialFilteredProducts = async (
  params: SearchParamsType,
): Promise<PaginatedResponseType> => {
  const queryParams = buildQueryParams(params, { page: 0 });
  return fetchProducts(
    queryParams,
    '초기 상품 데이터를 가져오는 중 오류 발생:',
  );
};

export const fetchFilteredProducts = async (
  params: SearchParamsType,
  page: number,
): Promise<PaginatedResponseType> => {
  const queryParams = buildQueryParams(params, { page });
  return fetchProducts(queryParams);
};

export const fetchMoreFilteredProducts = async (
  params: SearchParamsType,
  cursor: number,
): Promise<PaginatedResponseType> => {
  const queryParams = buildQueryParams(params, { cursor });
  return fetchProducts(
    queryParams,
    '추가 상품 데이터를 가져오는 중 오류 발생:',
    cursor,
  );
};

export const getProductDetail = async (
  productCode: number,
): Promise<ProductTypes> => {
  try {
    const response = await instance.get<ProductTypes>(
      `/products/${productCode}`,
      {
        requireAuth: false,
        next: { revalidate: 60 * 60 * 24 },
      },
    );

    return response.data;
  } catch (error) {
    console.error('상품 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

export async function getProductCategories(
  topCategoryId: number,
): Promise<ProductCategoryTopType[]> {
  const res = await instance.get<ProductCategoryTopType[]>(
    `/api/v1/categories/${topCategoryId}/subcategories`,
  );
  console.log('res', res);
  const data = res.data;

  return data;
}

export const getProductSimple = async (
  productCode: number,
): Promise<SimpleProduct> => {
  try {
    const response = await instance.get<SimpleProduct>(
      `/products/${productCode}/simple`,
      {
        requireAuth: false,
        cache: 'force-cache',
        tags: ['productSimple', `productSimple-${productCode}`],
        revalidate: 60 * 60 * 24,
      },
    );

    return response.data;
  } catch (error) {
    console.log('상품 심플 패칭 실패');

    throw error;
  }
};

export async function fetchRecentlyViewedItem(
  productCode: number,
  productThumbnailUrl: string,
) {
  try {
    const response = await instance.post(`/users/recently-view-products`, {
      requireAuth: true,
      body: JSON.stringify({
        productCode,
        productThumbnailUrl,
      }),
    });
    return response.data;
  } catch (error) {
    console.error('최근 본 상품 추가 실패:', error);
    throw error;
  }
}

export async function getRecentlyProducts(): Promise<
  DailyRecentlyViewedProductsType[]
> {
  try {
    const response = await instance.get<DailyRecentlyViewedProductsType[]>(
      `/users/recently-view-products`,
      {
        requireAuth: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('최근 본 상품 목록 조회 실패:', error);
    return [];
  }
}

export async function getProduct(productCode: number): Promise<ProductTypes> {
  try {
    const response = await instance.get<ProductTypes>(
      `/products/${productCode}`,
      {
        requireAuth: false,
        cache: 'force-cache',
        tags: ['product', `product-${productCode}`],
        revalidate: 60 * 60 * 24,
      },
    );

    return response.data;
  } catch (error) {
    console.error(`제품 정보(코드: ${productCode}) 조회 중 오류:`, error);
    throw error;
  }
}

export async function deleteRecentProduct(productCode: number) {
  try {
    return await instance.delete(
      `/users/recently-view-products/${productCode}`,
      {
        requireAuth: true,
      },
    );
  } catch (error) {
    console.error('최근 제품 삭제 중 오류 발생:', error);
    throw error;
  }
}

export async function deleteAllRecentProducts() {
  try {
    return await instance.delete(`/users/recently-view-products`, {
      requireAuth: true,
    });
  } catch (error) {
    console.error('최근 제품 삭제 중 오류 발생:', error);
    throw error;
  }
}

export const getProudctDetailData = async (
  productDetailCode: number,
): Promise<ProductDetailDataType> => {
  try {
    const res = await instance.get<ProductDetailDataType>(
      `/product-details/${productDetailCode}`,
      {
        requireAuth: false,
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProductOptionData = async (
  productCode: number,
): Promise<ProductOptionDataType> => {
  try {
    const res = await instance.get<ProductOptionsType>(
      `/products/${productCode}/options`,
      {
        requireAuth: false,
      },
    );

    return res?.data?.options;
  } catch (error) {
    throw error;
  }
};

export const getProductDetailWithOptions = async (
  productCode: number,
  sizeId: number | null,
  colorId: number | null,
) => {
  const params = new URLSearchParams();
  params.append('productCode', productCode.toString());
  if (sizeId !== null) params.append('sizeId', sizeId.toString());
  if (colorId !== null) params.append('colorId', colorId.toString());
  try {
    const res = await instance.get<{
      productDetailCode: number;
      inventoryQuantity: number;
    }>(`/product-details?${params.toString()}`, { requireAuth: false });
    return res.data;
  } catch (error) {
    throw error;
  }
};
