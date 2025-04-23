'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { PaginatedResponseType } from '@/types/products/productTypes';
import {
  getSearchResults,
  fetchMoreSearchResults,
} from '@/actions/search-service';
import { SearchParamsType } from '@/types/search/requestDataTypes';

type UseSearchInfiniteScrollOptions = {
  initialData: PaginatedResponseType;
  params: SearchParamsType;
};

export function useSearchInfiniteScroll({
  initialData,
  params,
}: UseSearchInfiniteScrollOptions) {
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

  const loadInitialSearchResults = useCallback(async () => {
    if (!isMountedRef.current || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const initialSearchData = await getSearchResults({
        ...params,
        size: 12,
        page: 0,
      });

      if (isMountedRef.current) {
        if (initialSearchData?.content?.length > 0) {
          setProducts([initialSearchData]);
          setHasMore(initialSearchData.hasNext || false);
          setCurrentCursor(initialSearchData.nextCursor || 0);
          setCurrentPage(1);
        } else {
          setProducts([]);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('초기 검색 결과 로드 오류:', error);
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

  // 초기 데이터 설정 및 업데이트
  useEffect(() => {
    if (!initialData?.content || initialData.content.length === 0) {
      loadInitialSearchResults();
      return;
    }

    setProducts([initialData]);
    setHasMore(initialData.hasNext || false);
    setCurrentCursor(initialData.nextCursor || 0);
    setCurrentPage(Number(params.page) || 1);
  }, [initialData, params.page, loadInitialSearchResults, params]);

  // 이전 페이지 로드 함수 (상단 스크롤)
  const loadPreviousPage = useCallback(async () => {
    if (isLoadingRef.current || currentPage <= 1 || !isMountedRef.current)
      return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const prevPage = currentPage - 1;
      const previousData = await getSearchResults({
        ...params,
        page: prevPage,
      });

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
      const nextData = await fetchMoreSearchResults(params, currentCursor);

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
  }, [currentCursor, hasMore, params]);

  // 상단 스크롤 감지 이벤트 리스너
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
