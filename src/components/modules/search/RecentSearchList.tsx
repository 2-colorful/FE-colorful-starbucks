// RecentSearchList.tsx 수정
'use client';

import { useState } from 'react';
import { SubTitle, Body } from '@/components/ui/common';
import RecentSearchItem from '@/components/ui/search/RecentSearchItem';
import SearchSection from '@/components/ui/search/SearchSection';
import {
  clearAllRecentSearchHistory,
  removeRecentSearchHistory,
} from '@/actions/search-service';
import type { RecentSearchType } from '@/types/search/recentSearchTypes';

interface RecentSearchListProps {
  initialRecentSearches?: RecentSearchType[]; // optional로 변경
  callbackUrl?: string;
}

export default function RecentSearchList({
  initialRecentSearches = [], // 기본값 빈 배열로 설정
  callbackUrl,
}: RecentSearchListProps) {
  const [recentSearches, setRecentSearches] = useState<RecentSearchType[]>(
    initialRecentSearches || [], // null/undefined 체크 추가
  );

  const handleClearAll = async () => {
    await clearAllRecentSearchHistory();
    setRecentSearches([]);
  };

  const handleRemoveItem = async (keyword: string) => {
    // keword에서 keyword로 수정
    await removeRecentSearchHistory(keyword);
    setRecentSearches((prev) =>
      prev.filter((item) => item.keyword !== keyword),
    );
  };

  if (!recentSearches || recentSearches.length === 0) {
    // null/undefined 체크 추가
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
            callbackUrl={callbackUrl}
            recentSearchHistory={recentSearchHistory}
            key={recentSearchHistory.searchAt}
            onRemove={() => handleRemoveItem(recentSearchHistory.keyword)}
          />
        ))}
      </ul>
    </SearchSection>
  );
}
