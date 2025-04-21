import { SearchParamsType } from '@/data/productDummy/productSearchTypes';

export const getSelectedArray = (selected?: string | string[]): string[] => {
  if (!selected) return [];
  return typeof selected === 'string' ? selected.split(',') : selected;
};

export const createQueryParams = (params: SearchParamsType) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'bottomCategoryIds' && Array.isArray(value)) {
        queryParams.append(key, value.join(','));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return queryParams.toString();
};

export const buildQueryParams = (
  params: SearchParamsType,
  options: { page?: number; cursor?: number; size?: number } = {},
): URLSearchParams => {
  const { page, cursor, size = 12 } = options;
  const queryParams = new URLSearchParams();

  queryParams.append('size', size.toString());

  if (params.topCategoryId) {
    queryParams.append('topCategoryId', params.topCategoryId);
  }
  if (params.topCategoryId === '0') {
    queryParams.delete('topCategoryId');
  }

  if (params.bottomCategoryIds) {
    const bottomCategoryIds =
      typeof params.bottomCategoryIds === 'string'
        ? params.bottomCategoryIds.split(',')
        : params.bottomCategoryIds;

    queryParams.append(
      'bottomCategoryIds',
      Array.isArray(bottomCategoryIds)
        ? bottomCategoryIds.join(',')
        : bottomCategoryIds,
    );
  }

  // 가격 범위 필터
  if (params.minPrice) queryParams.append('minPrice', params.minPrice);
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);

  // 정렬 옵션
  queryParams.append('sortBy', '');
  if (params.sortBy) queryParams.set('sortBy', params.sortBy);

  // 페이지네이션 파라미터 (page 또는 cursor)
  if (page !== undefined) {
    queryParams.append('page', page.toString());
  }
  if (cursor !== undefined) {
    queryParams.append('cursor', cursor.toString());
  }

  return queryParams;
};
