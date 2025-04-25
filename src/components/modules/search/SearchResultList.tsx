'use client';

import type { PaginatedResponseType } from '@/types/products/productTypes';
import Loader from '@/components/ui/common/Loader';
import BottomScrollLoader from '@/components/pages/product/BottomScrollLoader';
import { useSearchInfiniteScroll } from '@/hooks/useSearchInfiniteScroll';
import { SearchParamsType } from '@/types/search/requestDataTypes';
import SearchResultItemSection from '@/components/layouts/search/SearchResultItemSection';

interface SearchResultListProps {
  params: SearchParamsType;
  initialData: PaginatedResponseType;
}

export default function SearchResultList({
  params,
  initialData,
}: SearchResultListProps) {
  const { products, isLoading, hasMore, loadNextPage, isEmpty } =
    useSearchInfiniteScroll({
      initialData,
      params,
    });

  if (isEmpty) {
    return (
      <section className='py-6 flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-500 mb-4'>검색 결과가 없습니다.</p>
          {isLoading && <Loader size='10' />}
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col'>
      <div className='px-4 py-4'>
        {products.map((pageData, index) => (
          <SearchResultItemSection key={index} pageData={pageData} />
        ))}

        <BottomScrollLoader
          hasMore={hasMore}
          isLoading={isLoading}
          onIntersect={loadNextPage}
        />
      </div>
    </section>
  );
}
