'use server';

import { instance } from '../instance';
import {
  AutoCompleteItem,
  RecentSearchType,
} from '@/types/search/recentSearchTypes';
import {
  SearchApiParams,
  SearchResponseType,
  SearchUrlParams,
} from '@/types/search/requestDataTypes';

export const getRecentSearchHistory = async (): Promise<RecentSearchType[]> => {
  try {
    const result = await instance.get<{
      recentlySearchKeywords: RecentSearchType[];
    }>(`/users/recently-search`, {
      requireAuth: true,
    });

    return result.data.recentlySearchKeywords;
  } catch (error) {
    throw error;
  }
};

export async function clearAllRecentSearchHistory() {
  try {
    await instance.delete(`/users/recently-search`, {
      requireAuth: true,
    });
  } catch (error) {
    throw error;
  }
}

export async function removeRecentSearchHistory(keyword: string) {
  try {
    await instance.delete(`/users/recently-search/${keyword}`, {
      requireAuth: true,
    });
  } catch (error) {
    throw error;
  }
}
export const addRecentSearchHistory = async (keyword: string) => {
  try {
    await instance.post(`/users/recently-search?keyword=${keyword}`, {
      requireAuth: true,
    });
    console.log(keyword, '저장완료');

    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const getAutoCompleteResult = async (
  keyword: string,
): Promise<string[]> => {
  if (!keyword.trim()) return [];

  try {
    const response = await instance.get<{ autoSearchList: AutoCompleteItem[] }>(
      `/es/auto-complete?keyword=${keyword}`,
      {
        requireAuth: false,
      },
    );

    return response.data.autoSearchList.map((item) => item.productName);
  } catch (error) {
    console.error('Auto-complete API error:', error);
    return [];
  }
};

const transformSearchParams = (params: SearchUrlParams): SearchApiParams => {
  const apiParams: SearchApiParams = {
    query: params.query,
    size: params.size ? Number(params.size) : 20,
  };

  if (params.minPrice) {
    apiParams.minPrice = Number(params.minPrice);
  }

  if (params.maxPrice) {
    apiParams.maxPrice = Number(params.maxPrice);
  }

  if (params.page) {
    apiParams.page = Number(params.page);
  }

  return apiParams;
};

export const getSearchResults = async (
  params: SearchUrlParams,
): Promise<SearchResponseType> => {
  try {
    const apiParams = transformSearchParams(params);
    const response = await instance.post<SearchResponseType>('/search', {
      body: JSON.stringify(apiParams),
      requireAuth: false,
    });

    if (response.data) {
      return response.data;
    }

    return {
      content: [],
      hasNext: false,
      nextCursor: 0,
    };
  } catch (error) {
    console.error('검색 결과를 가져오는 중 오류 발생:', error);
    return {
      content: [],
      hasNext: false,
      nextCursor: 0,
    };
  }
};

export const getSearchResultsByPage = async (
  params: SearchUrlParams,
  page: number,
): Promise<SearchResponseType> => {
  try {
    const apiParams = transformSearchParams(params);
    apiParams.page = page;

    const response = await instance.post<SearchResponseType>('/search', {
      body: JSON.stringify(apiParams),
      requireAuth: false,
    });

    if (response.data) {
      return response.data;
    }

    return {
      content: [],
      hasNext: false,
      nextCursor: 0,
    };
  } catch (error) {
    console.error('특정 페이지 검색 결과를 가져오는 중 오류 발생:', error);
    return {
      content: [],
      hasNext: false,
      nextCursor: 0,
    };
  }
};

export const getMoreSearchResults = async (
  params: SearchUrlParams,
  cursor: number,
): Promise<SearchResponseType> => {
  try {
    const apiParams = transformSearchParams(params);
    apiParams.cursor = cursor;

    const response = await instance.post<SearchResponseType>('/search/next', {
      body: JSON.stringify(apiParams),
      requireAuth: false,
    });

    if (response.data) {
      return response.data;
    }

    return {
      content: [],
      hasNext: false,
      nextCursor: cursor,
    };
  } catch (error) {
    console.error('추가 검색 결과를 가져오는 중 오류 발생:', error);
    return {
      content: [],
      hasNext: false,
      nextCursor: cursor,
    };
  }
};
