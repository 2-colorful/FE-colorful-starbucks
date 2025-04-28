'use client';
import { ChevronUp } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductDetailCategoryTabBar from '@/components/modules/product/ProductDetailCategoryTabBar';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import { CategoryBottomResponseType } from '@/types/products/categoryResponseTypes';
import { priceOptions } from '@/data/category/categoryData';
import ProductPriceFilterRow from '@/components/modules/product/ProductPriceFilterRow';
import { cn } from '@/lib/utils';

type ProductDetailCategorySectionProps = {
  topCategoryId: string;
  bottomCategory: CategoryBottomResponseType[];
};

export default function ProductDetailCategorySection({
  topCategoryId,
  bottomCategory,
}: ProductDetailCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAll, setIsAll] = useState(false);
  const rawSearchParams = useSearchParams();

  useEffect(() => {
    if (bottomCategory.length > 0 && topCategoryId !== '19') {
      setIsAll(true);
    } else {
      setIsAll(false);
    }
  }, [bottomCategory, topCategoryId]);

  const searchParams: SearchParamsType = useMemo(() => {
    const rawBottomCategoryIds = rawSearchParams.get('bottomCategoryIds');
    const bottomCategoryIds = rawBottomCategoryIds
      ? [...new Set(rawBottomCategoryIds.split(','))]
      : [];
    return {
      bottomCategoryIds: bottomCategoryIds,
      price: rawSearchParams.get('price') || '',
    };
  }, [rawSearchParams]);

  const sectionHeight = isAll
    ? isExpanded
      ? 'h-[100px]'
      : 'h-[1px]'
    : 'h-[52px]';

  return (
    <>
      <section
        className={cn(
          sectionHeight,
          'w-full transition-all duration-[1s] overflow-hidden bg-white',
          topCategoryId === '19' ? 'mb-0' : 'mb-3',
        )}
      >
        {isAll && (
          <ProductDetailCategoryTabBar
            categories={bottomCategory}
            selectedIds={searchParams.bottomCategoryIds}
          />
        )}
        <ProductPriceFilterRow title='가격' priceOptions={priceOptions} />
      </section>

      {isAll && (
        <div className='w-full py-3 flex justify-center border-b border-stroke-100'>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center text-body3 text-text-700'
            type='button'
          >
            {isExpanded ? '접기' : '펼치기'}
            <ChevronUp
              size={16}
              className={cn(
                isExpanded ? 'rotate-0' : 'rotate-180',
                'transition-all ml-1',
              )}
            />
          </button>
        </div>
      )}
    </>
  );
}
