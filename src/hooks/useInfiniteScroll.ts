'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';
import { PaginatedResponseType } from '@/types/products/productTypes';
import {
  fetchFilteredProducts,
  fetchMoreFilteredProducts,
} from '@/actions/product-service';

type UseInfiniteScrollOptions = {
  initialData: PaginatedResponseType;
  params: SearchParamsType;
};

export function useInfiniteScroll({
  initialData,
  params,
}: UseInfiniteScrollOptions) {
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

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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

  const loadPreviousPage = useCallback(async () => {
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
  }, [currentPage, params]);

  const loadNextPage = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || !isMountedRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const nextData = await fetchMoreFilteredProducts(params, currentCursor);

      if (isMountedRef.current) {
        if (nextData?.content?.length > 0) {
          setProducts((prev) => [...prev, nextData]);
          setHasMore(nextData.hasNext || false);

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
  }, [currentCursor, hasMore, params]);

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
  }, [currentPage, loadPreviousPage]);

  return {
    products,
    isLoading,
    hasMore,
    loadNextPage,
    loadPreviousPage,
    isEmpty: !initialData?.content || initialData.content.length === 0,
  };
}
