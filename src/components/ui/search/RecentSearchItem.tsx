'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import type { RecentSearchType } from '@/types/search/recentSearchTypes';

type RecentSearchItemProps = {
  recentSearchHistory: RecentSearchType;
  callbackUrl?: string;
  onRemove: () => void;
};

export default function RecentSearchItem({
  recentSearchHistory,
  onRemove,
}: RecentSearchItemProps) {
  return (
    <li className='flex justify-between items-center gap-3'>
      <Link
        href={`/search/result?query=${encodeURIComponent(recentSearchHistory.keyword)}`}
        className='text-sm truncate'
      >
        {recentSearchHistory.keyword}
      </Link>

      <button
        onClick={onRemove}
        className='cursor-pointer'
        aria-label={`${recentSearchHistory.keyword} 검색어 삭제`}
      >
        <X className='w-4 h-4 text-gray-900' />
      </button>
    </li>
  );
}
