'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import { PaginatedResponseType } from '@/types/products/productTypes';
import {
  fetchFilteredProducts,
  fetchMoreFilteredProducts,
} from '@/actions/product-service';
import Loader from '@/components/ui/common/Loader';
import FilteredProductItemSection from '@/components/layouts/product/FilteredProductSection';
import BottomScrollLoader from './BottomScrollLoader';
import SortProducts from '@/components/modules/product/SortProducts';

type FilteredProductListProps = {
  params: SearchParamsType;
  initialData: PaginatedResponseType;
};

export default function FilteredProductList({
  params,
  initialData,
}: FilteredProductListProps) {
  const [products, setProducts] = useState<PaginatedResponseType[]>([
    initialData,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData?.hasNext || false);
  const [currentCursor, setCurrentCursor] = useState<number>(
    initialData?.nextCursor || 0,
  );
  const [currentPage, setCurrentPage] = useState(Number(params.page) || 0);

  const isMountedRef = useRef(true);
  const isLoadingRef = useRef(false);

  const loadInitialProducts = useCallback(async () => {
    if (!isMountedRef.current || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const initialProductData = await fetchFilteredProducts(params, 0);

      if (isMountedRef.current) {
        if (initialProductData?.content?.length > 0) {
          setProducts([initialProductData]);
          setHasMore(initialProductData.hasNext || false);
          setCurrentCursor(initialProductData.nextCursor || 0);
          setCurrentPage(1);
        } else {
          setProducts([]);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('초기 상품 로드 오류:', error);
      if (isMountedRef.current) {
        setProducts([]);
        setHasMore(false);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }
  }, [params]);

  useEffect(() => {
    if (!initialData?.content || initialData.content.length === 0) {
      loadInitialProducts();
      return;
    }

    setProducts([initialData]);
    setHasMore(initialData.hasNext || false);
    setCurrentCursor(initialData.nextCursor || 0);
    setCurrentPage(Number(params.page) || 1);
  }, [initialData, params.page, loadInitialProducts]);

  // 상단 스크롤 로드 (이전 페이지)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && currentPage > 1 && !isLoadingRef.current) {
        loadPreviousPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  // 이전 페이지 로드 함수
  const loadPreviousPage = async () => {
    if (isLoadingRef.current || currentPage <= 1 || !isMountedRef.current)
      return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const prevPage = currentPage - 1;
      const previousData = await fetchFilteredProducts(params, prevPage);

      if (isMountedRef.current && previousData?.content?.length > 0) {
        setProducts((prev) => [previousData, ...prev]);
        setCurrentPage(prevPage);
      }
    } catch (error) {
      console.error('이전 페이지 로드 오류:', error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }
  };

  // 다음 페이지 요청 함수 (무한 스크롤)
  const loadNextPage = async () => {
    if (isLoadingRef.current || !hasMore || !isMountedRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const nextData = await fetchMoreFilteredProducts(params, currentCursor);

      if (isMountedRef.current) {
        if (nextData?.content?.length > 0) {
          setProducts((prev) => [...prev, nextData]);
          setHasMore(nextData.hasNext || false);

          // 안전하게 커서 업데이트
          if (nextData.nextCursor !== undefined) {
            setCurrentCursor(nextData.nextCursor);
          }

          setCurrentPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('다음 페이지 로드 오류:', error);
      if (isMountedRef.current) {
        setHasMore(false);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }
  };

  if (!initialData?.content || initialData.content.length === 0) {
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
    <section className='padded ml-4 mr-4  flex justify-center flex-col'>
      <div className='mt-2 mb-4  flex justify-end'>
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
