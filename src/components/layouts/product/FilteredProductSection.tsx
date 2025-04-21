'use client';

import FilteredProductItemCard from '@/components/modules/product/FilteredProductItemCard';
import { PaginatedResponseType } from '@/types/products/productTypes';

interface FilteredProductItemSectionProps {
  pageData?: PaginatedResponseType | null;
}

export default function FilteredProductItemSection({
  pageData,
}: FilteredProductItemSectionProps) {
  if (!pageData?.content?.length) {
    return (
      <ul className='w-full grid grid-cols-2 gap-4'>
        {[...Array(4)].map((_, index) => (
          <li key={`skeleton-${index}`}>
            <div className='animate-pulse bg-gray-200 h-48 w-full rounded-lg'></div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {pageData.content.map((product) => (
        <li key={`${product.productCode}`}>
          <FilteredProductItemCard productCode={product.productCode} />
        </li>
      ))}
    </ul>
  );
}
