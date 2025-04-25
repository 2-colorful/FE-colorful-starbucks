'use client';
import { useState, useEffect, useCallback } from 'react';

import SearchForm from '@/components/pages/search/SearchForm';
import RecentSearchList from '@/components/modules/search/RecentSearchList';
import { GUEST_STORAGE_KEY } from '@/lib/search/util';
import type { RecentSearchType } from '@/types/search/recentSearchTypes';

export default function ClientSearchWrapper() {
  const [recentSearches, setRecentSearches] = useState<RecentSearchType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSearches = useCallback((): void => {
    setIsLoading(true);
    try {
      const savedSearches = localStorage.getItem(GUEST_STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('로컬 스토리지에서 검색어 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSearches();
  }, [loadSearches]);

  const handleClearAll = useCallback((): void => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    setRecentSearches([]);
  }, []);

  const handleRemoveItem = useCallback((keyword: string): void => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter(
        (item) => item.keyword !== keyword,
      );
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, []);

  const handleAddSearch = useCallback((keyword: string): void => {
    setRecentSearches((prevSearches) => {
      const newSearch: RecentSearchType = {
        keyword,
        searchAt: new Date().toISOString(),
      };

      const updatedSearches = [
        newSearch,
        ...prevSearches.filter((item) => item.keyword !== keyword),
      ];

      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, []);

  if (isLoading) {
    return (
      <main className='flex flex-col h-full max-h-dvh'>
        <SearchForm isGuest={true} onAddSearch={handleAddSearch} />
        <div className='flex justify-center items-center h-full'>
          <p>로딩 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className='flex flex-col h-full max-h-dvh'>
      <SearchForm isGuest={true} onAddSearch={handleAddSearch} />
      <RecentSearchList
        initialRecentSearches={recentSearches}
        isGuest={true}
        onClearAll={handleClearAll}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}
