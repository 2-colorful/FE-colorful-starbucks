'use client';
import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { CategoryTopResponseType } from '@/types/products/categoryResponseTypes';
import ProductCategoryTop from '@/components/ui/products/ProductCategoryTop';

type ProductCategoryTopTabBarProps = {
  topCategory: CategoryTopResponseType[];
};

export default function ProductCategoryTopTabBar({
  topCategory,
}: ProductCategoryTopTabBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryCode = searchParams.get('topCategoryId') || '0';

  const activeTabRef = useRef<HTMLLIElement>(null);

  const handleCategoryClick = (category: CategoryTopResponseType) => {
    router.replace(`?topCategoryId=${category.topCategoryId}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentCategoryCode]);

  return (
    <ul className='flex  border-b boarder-stroke-100 overflow-x-auto scrollbar-hidden'>
      {topCategory.map((category) => {
        const isActive = currentCategoryCode === String(category.topCategoryId);
        return (
          <li
            key={category.topCategoryId}
            className='flex-shrink-0'
            ref={isActive ? activeTabRef : null}
          >
            <ProductCategoryTop
              name={category.categoryName}
              isActive={isActive}
              onClick={() => handleCategoryClick(category)}
            />
          </li>
        );
      })}
    </ul>
  );
}
