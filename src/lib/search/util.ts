'use client';

import { addRecentSearchHistory } from '@/actions/search-service';
import type { RecentSearchType } from '@/types/search/recentSearchTypes';

export const GUEST_STORAGE_KEY = 'guestRecentSearches';
const MAX_RECENT_SEARCHES = 10;

export const addGuestRecentSearch = (keyword: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const savedSearches = localStorage.getItem(GUEST_STORAGE_KEY);
    let recentSearches: RecentSearchType[] = savedSearches
      ? JSON.parse(savedSearches)
      : [];

    recentSearches = recentSearches.filter((item) => item.keyword !== keyword);

    const newSearch: RecentSearchType = {
      keyword,
      searchAt: new Date().toISOString(),
    };

    recentSearches.unshift(newSearch);

    if (recentSearches.length > MAX_RECENT_SEARCHES) {
      recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);
    }

    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(recentSearches));
  } catch (error) {
    console.error('로컬 스토리지에 검색어 저장 실패:', error);
  }
};

export const getGuestRecentSearchHistory = (): RecentSearchType[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedSearches = localStorage.getItem(GUEST_STORAGE_KEY);
    return savedSearches ? JSON.parse(savedSearches) : [];
  } catch (error) {
    console.error('로컬 스토리지에서 검색어 가져오기 실패:', error);
    return [];
  }
};

export const removeGuestRecentSearchHistory = (keyword: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const savedSearches = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!savedSearches) return;

    const recentSearches: RecentSearchType[] = JSON.parse(savedSearches);
    const updatedSearches = recentSearches.filter(
      (item) => item.keyword !== keyword,
    );

    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error('로컬 스토리지에서 검색어 삭제 실패:', error);
  }
};

export const clearAllGuestRecentSearchHistory = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(GUEST_STORAGE_KEY);
  } catch (error) {
    console.error('로컬 스토리지 검색어 전체 삭제 실패:', error);
  }
};

export const migrateGuestSearchesToDB = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const storedSearches = localStorage.getItem(GUEST_STORAGE_KEY);

    if (!storedSearches) return false;

    const recentSearches = JSON.parse(storedSearches) as RecentSearchType[];

    if (!recentSearches || recentSearches.length === 0) return false;

    const sortedSearches = [...recentSearches].sort(
      (a, b) => new Date(b.searchAt).getTime() - new Date(a.searchAt).getTime(),
    );

    for (const search of sortedSearches) {
      try {
        await addRecentSearchHistory(search.keyword);
        console.log(`검색어 "${search.keyword}" DB 저장 완료`);
      } catch (error) {
        console.error(`검색어 "${search.keyword}" DB 저장 실패:`, error);
      }
    }

    localStorage.removeItem(GUEST_STORAGE_KEY);

    console.log(
      '최근 검색어 데이터 이관 완료:',
      recentSearches.length,
      '개 항목',
    );
    return true;
  } catch (error) {
    console.error('최근 검색어 데이터 이관 실패:', error);
    return false;
  }
};
