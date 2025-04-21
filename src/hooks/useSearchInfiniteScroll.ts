'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  getSearchResults,
  getSearchResultsByPage,
  getMoreSearchResults,
} from '@/actions/search-service';
import { SearchResponseType } from '@/types/search/requestDataTypes';

type SearchParams = {
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  size?: string;
};

type UseInfiniteScrollOptions = {
  initialData: SearchResponseType;
  params: SearchParams;
};

export function useInfiniteScroll({
  initialData,
  params,
}: UseInfiniteScrollOptions) {
  const [products, setProducts] = useState<SearchResponseType[]>([initialData]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData?.hasNext || false);
  const [currentCursor, setCurrentCursor] = useState<number>(
    initialData?.nextCursor || 0,
  );
  const [currentPage, setCurrentPage] = useState(Number(params.page) || 0);

  const isMountedRef = useRef(true);
  const isLoadingRef = useRef(false);

  // 컴포넌트 언마운트 시 isMountedRef 상태 업데이트
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 초기 검색 결과 로드
  const loadInitialProducts = useCallback(async () => {
    if (!isMountedRef.current || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const initialProductData = await getSearchResults(params);

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
      loadInitialProducts();
      return;
    }

    setProducts([initialData]);
    setHasMore(initialData.hasNext || false);
    setCurrentCursor(initialData.nextCursor || 0);
    setCurrentPage(Number(params.page) || 1);
  }, [initialData, params.page, loadInitialProducts]);

  // 이전 페이지 로드 함수 (상단 스크롤)
  const loadPreviousPage = useCallback(async () => {
    if (isLoadingRef.current || currentPage <= 1 || !isMountedRef.current)
      return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const prevPage = currentPage - 1;
      const previousData = await getSearchResultsByPage(params, prevPage);

      if (isMountedRef.current && previousData?.content?.length > 0) {
        setProducts((prev) => [previousData, ...prev]);
        setCurrentPage(prevPage);
      }
    } catch (error) {
      console.error('이전 검색 결과 페이지 로드 오류:', error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }
  }, [currentPage, params]);

  // 다음 페이지 로드 함수 (하단 스크롤)
  const loadNextPage = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || !isMountedRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const nextData = await getMoreSearchResults(params, currentCursor);

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
      console.error('다음 검색 결과 페이지 로드 오류:', error);
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
