'use server';

import { SearchQueryRequestDataType } from '@/types/search/requestDataTypes';
import { instance } from '../instance';
import {
  AutoCompleteItem,
  RecentSearchType,
} from '@/types/search/recentSearchTypes';

//수정예정
export const getSearchResults = async (data: SearchQueryRequestDataType) => {
  const queryData = Object.entries(data);
  const searchParams = new URLSearchParams(queryData).toString();

  try {
    const res = await fetch(`/api/v1/search?${searchParams}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getRecentSearchHistory = async (): Promise<RecentSearchType[]> => {
  try {
    const result = await instance.get<{
      recentlySearchKewords: RecentSearchType[];
    }>(`/users/recently-search`, {
      requireAuth: true,
    });

    return result.data.recentlySearchKewords;
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
