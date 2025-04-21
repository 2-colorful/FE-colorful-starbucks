'use client';

import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import { PaginatedResponseType } from '@/types/products/productTypes';
import Loader from '@/components/ui/common/Loader';
import FilteredProductItemSection from '@/components/layouts/product/FilteredProductSection';
import BottomScrollLoader from './BottomScrollLoader';
import SortProducts from '@/components/modules/product/SortProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type FilteredProductListProps = {
  params: SearchParamsType;
  initialData: PaginatedResponseType;
};

export default function FilteredProductList({
  params,
  initialData,
}: FilteredProductListProps) {
  const { products, isLoading, hasMore, loadNextPage, isEmpty } =
    useInfiniteScroll({ initialData, params });

  if (isEmpty) {
    return (
      <section className='padded py-6 flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <p className='text-lightGray-6 mb-4'>상품이 없습니다.</p>
          {isLoading && <Loader size='10' />}
        </div>
      </section>
    );
  }

  return (
    <section className='padded ml-4 mr-4 flex justify-center flex-col'>
      <div className='mt-2 mb-4 flex justify-end'>
        <SortProducts />
      </div>

      {products.map((pageData, index) => (
        <FilteredProductItemSection key={index} pageData={pageData} />
      ))}

      <BottomScrollLoader
        hasMore={hasMore}
        isLoading={isLoading}
        onIntersect={loadNextPage}
      />
    </section>
  );
}
