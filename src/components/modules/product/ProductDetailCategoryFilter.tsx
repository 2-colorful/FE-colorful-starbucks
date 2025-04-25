'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function ProductDetailCategoryFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeFilter = searchParams.get('activeFilter') || 'category';

  const filters = [
    { id: 'category', name: '카테고리' },
    { id: 'volume', name: '용량' },
    { id: 'season', name: '시즌' },
    { id: 'price', name: '가격' },
  ];

  const updateQueryParams = (filterId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('activeFilter', filterId);

    const topCategoryId = searchParams.get('topCategoryId');
    if (topCategoryId) {
      params.set('topCategoryId', topCategoryId);
    }

    return params.toString();
  };

  return (
    <div className='w-full border-b border-stroke-100'>
      <div className='flex overflow-x-auto scrollbar-hidden'>
        {filters.map((filter) => (
          <Link
            key={filter.id}
            href={`${pathname}?${updateQueryParams(filter.id)}`}
            className={cn(
              'px-4 py-3 text-body3 whitespace-nowrap',
              activeFilter === filter.id
                ? 'text-primary-100 border-b-2 border-primary-100'
                : 'text-text-700',
            )}
            scroll={false}
          >
            {filter.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
