'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getRecentlyViewedProducts,
  groupItemsByDate,
  LOCAL_STORAGE_KEY,
} from '@/lib/recently-viewed/utils';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';
import RecentProductListLocal from '@/components/pages/product/RecentProductListLocal';

export default function RecentlyViewedLocalPage() {
  const [recentProducts, setRecentProducts] = useState<
    DailyRecentlyViewedProductsType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 데이터 로드 함수
  const loadData = () => {
    setIsLoading(true);
    try {
      const localItems = getRecentlyViewedProducts();
      const groupedByDate = groupItemsByDate(localItems);
      setRecentProducts(groupedByDate);
    } catch (error) {
      console.error('최근 본 상품 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 비회원 상태에서 전체 삭제 처리
  const handleLocalStorageDeleteAll = () => {
    if (confirm('최근 본 상품을 모두 삭제하시겠습니까?')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      // 즉시 상태 업데이트로 UI 반영
      setRecentProducts([]);
      // 백그라운드에서 페이지 리프레시
      router.refresh();
    }
  };

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-60'>로딩 중...</div>
    );
  }

  return (
    <main>
      {recentProducts.length > 0 ? (
        <>
          <div className='flex justify-end mr-3 mt-3'>
            <button
              onClick={handleLocalStorageDeleteAll}
              className='text-sm font-medium text-text-900'
            >
              전체 삭제
            </button>
          </div>
          <RecentProductListLocal recentProducts={recentProducts} />
        </>
      ) : (
        <div className='flex flex-col items-center justify-center h-60 mt-50 mb-50'>
          <p className='text-body1'>최근 본 상품이 없습니다</p>
          <p className='text-sm text-gray-500 mt-2'>
            로그인하면 최근 본 상품이 계정에 저장됩니다.
          </p>
        </div>
      )}
    </main>
  );
}
