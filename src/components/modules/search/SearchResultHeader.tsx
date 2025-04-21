'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryCountType } from '@/types/search/requestDataTypes';
import { useEffect, useRef } from 'react';

interface SearchResultHeaderProps {
  query: string;
  categoryCounts: CategoryCountType[];
}

export default function SearchResultHeader({
  query,
  categoryCounts,
}: SearchResultHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const selectedCategoryRef = useRef<HTMLButtonElement>(null);

  const totalCount = categoryCounts.reduce(
    (acc, category) => acc + category.count,
    0,
  );

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCategory === categoryName) {
      params.delete('category');
    } else {
      params.set('category', categoryName);
    }

    router.replace(`/result?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (currentCategory && selectedCategoryRef.current) {
      selectedCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentCategory]);

  return (
    <header className='bg-white z-10 shadow-sm'>
      <div className='px-4 py-3 border-b'>
        <h1 className='text-lg font-medium truncate flex-1'>
          {query} 검색결과
        </h1>
      </div>

      {categoryCounts.length > 0 && (
        <div className='px-4 py-3 border-b'>
          <p className='text-sm text-gray-500 mb-2'>
            총{' '}
            <span className='font-bold text-primary-100'>
              {totalCount.toLocaleString()}
            </span>
            개의 상품이 검색되었습니다.
          </p>

          <div className='flex overflow-x-auto scrollbar-hidden py-1'>
            {categoryCounts.map((category, index) => {
              const isSelected = currentCategory === category.topCategoryName;

              return (
                <button
                  key={index}
                  ref={isSelected ? selectedCategoryRef : null}
                  onClick={() => handleCategoryClick(category.topCategoryName)}
                  className={`flex-shrink-0 px-3 py-1 mr-2 text-sm rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-primary-100 text-white border-primary-100'
                      : 'border-gray-200 hover:border-primary-100 hover:text-primary-100'
                  }`}
                >
                  {category.topCategoryName} ({category.count.toLocaleString()})
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
