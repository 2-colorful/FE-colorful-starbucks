'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import { SubDetailCategoryType } from '@/types/products/productCategoryType';
import { ProductBottomTabBarWrapper } from '@/components/ui/common/product/ProductBottomTabBarWrapper';

type ProductDetailCategoryTabBarProps = {
  categories: SubDetailCategoryType[];
  selectedIds: string[] | string | undefined;
};

export default function ProductDetailCategoryTabBar({
  categories,
  selectedIds,
}: ProductDetailCategoryTabBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedArray = React.useMemo(() => {
    if (!selectedIds) return [];
    if (typeof selectedIds === 'string') return [selectedIds];
    return selectedIds;
  }, [selectedIds]);

  const updateQueryParams = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryIdString = categoryId.toString();

    if (selectedArray.includes(categoryIdString)) {
      const newSelected = selectedArray.filter((id) => id !== categoryIdString);

      if (newSelected.length === 0) {
        params.delete('bottomCategoryIds');
      } else {
        params.set('bottomCategoryIds', newSelected.join(','));
      }
    } else {
      const newSelected = [...selectedArray, categoryIdString];
      params.set('bottomCategoryIds', newSelected.join(','));
    }

    return params.toString();
  };

  return (
    <ProductBottomTabBarWrapper title='카테고리'>
      {categories.map((category) => {
        const categoryIdString = category.bottomCategoryId.toString();
        const isActive = selectedArray.includes(categoryIdString);

        return (
          <Link
            key={category.bottomCategoryId}
            href={`${pathname}?${updateQueryParams(category.bottomCategoryId)}`}
            replace
            className={`text-body3 ${isActive ? 'text-primary-100 font-black' : 'text-text-700'}`}
            scroll={false}
          >
            {category.categoryName}
          </Link>
        );
      })}
    </ProductBottomTabBarWrapper>
  );
}
