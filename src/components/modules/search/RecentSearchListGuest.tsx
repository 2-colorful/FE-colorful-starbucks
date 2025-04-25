'use client';
import { useState, useEffect } from 'react';

import { SubTitle, Body } from '@/components/ui/common';
import RecentSearchItem from '@/components/ui/search/RecentSearchItem';
import SearchSection from '@/components/ui/search/SearchSection';
import type { RecentSearchType } from '@/types/search/recentSearchTypes';
import { GUEST_STORAGE_KEY } from '@/lib/search/util';

export default function RecentSearchListGuest() {
  const [recentSearches, setRecentSearches] = useState<RecentSearchType[]>([]);
  const [isClient, setIsClient] = useState(false);

  // 컴포넌트 마운트 시 로컬 스토리지에서 최근 검색어 로드
  useEffect(() => {
    setIsClient(true);
    try {
      const savedSearches = localStorage.getItem(GUEST_STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('로컬 스토리지에서 검색어 로드 실패:', error);
    }
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    setRecentSearches([]);
  };

  const handleRemoveItem = (keyword: string) => {
    const updatedSearches = recentSearches.filter(
      (item) => item.keyword !== keyword,
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updatedSearches));
  };

  // 서버 사이드 렌더링 시 로컬 스토리지 접근 에러 방지
  if (!isClient) {
    return (
      <SearchSection className='flex flex-col justify-center h-full'>
        <Body className='text-black text-center'>
          최근 검색어를 불러오는 중...
        </Body>
      </SearchSection>
    );
  }

  if (recentSearches.length === 0) {
    return (
      <SearchSection className='flex flex-col justify-center h-full'>
        <Body className='text-black text-center'>최근 검색어가 없습니다.</Body>
      </SearchSection>
    );
  }

  return (
    <SearchSection>
      <div className='flex justify-between items-center pb-5'>
        <SubTitle>최근 검색어</SubTitle>
        <button
          onClick={handleClearAll}
          className='text-caption2 text-text-700 hover:text-black focus:text-black transition-colors cursor-pointer'
        >
          전체 삭제
        </button>
      </div>

      <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 border-b border-[#e0e0e0] pb-5'>
        {recentSearches.map((recentSearchHistory) => (
          <RecentSearchItem
            recentSearchHistory={recentSearchHistory}
            key={recentSearchHistory.searchAt}
            onRemove={() => handleRemoveItem(recentSearchHistory.keyword)}
          />
        ))}
      </ul>
    </SearchSection>
  );
}
