import { SearchParamsType } from '@/types/search/requestDataTypes';

export function transformSearchParams(urlParams: {
  query?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}): SearchParamsType {
  const apiParams: SearchParamsType = {
    query: urlParams.query || '',
  };

  if (urlParams.category && urlParams.category.trim() !== '') {
    apiParams.category = urlParams.category;
  }

  if (urlParams.minPrice && !isNaN(Number(urlParams.minPrice))) {
    apiParams.minPrice = Number(urlParams.minPrice);
  }

  if (urlParams.maxPrice && !isNaN(Number(urlParams.maxPrice))) {
    apiParams.maxPrice = Number(urlParams.maxPrice);
  }

  apiParams.page = 0;
  if (urlParams.page && !isNaN(Number(urlParams.page))) {
    apiParams.page = Number(urlParams.page);
  }

  return apiParams;
}
