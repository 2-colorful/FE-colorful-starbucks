'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getRecentlyViewedProducts,
  groupItemsByDate,
  RecentlyViewedItem,
  deleteRecentlyViewedProduct,
  deleteAllRecentlyViewedProducts,
} from '@/lib/recently-viewed/utils';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';
import RecentProductListLocal from '@/components/pages/product/RecentProductListLocal';

export default function ClientRecentlyViewedWrapper() {
  const [recentProducts, setRecentProducts] = useState<
    DailyRecentlyViewedProductsType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadData = useCallback((): void => {
    setIsLoading(true);
    try {
      const localItems: RecentlyViewedItem[] = getRecentlyViewedProducts();
      const groupedByDate: DailyRecentlyViewedProductsType[] =
        groupItemsByDate(localItems);
      setRecentProducts(groupedByDate);
    } catch (error) {
      console.error('최근 본 상품 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLocalStorageDeleteAll = useCallback((): void => {
    if (confirm('최근 본 상품을 모두 삭제하시겠습니까?')) {
      deleteAllRecentlyViewedProducts();
      setRecentProducts([]);
      setTimeout(() => {
        router.refresh();
      }, 0);
    }
  }, [router]);

  const handleDeleteProduct = useCallback((productCode: number): void => {
    deleteRecentlyViewedProduct(productCode);

    setRecentProducts((prevProducts) =>
      prevProducts
        .map((group) => ({
          ...group,
          recentlyViewProducts: group.recentlyViewProducts.filter(
            (product) => product.productCode !== productCode,
          ),
        }))
        .filter((group) => group.recentlyViewProducts.length > 0),
    );
  }, []);

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
          <RecentProductListLocal
            recentProducts={recentProducts}
            onDeleteProduct={handleDeleteProduct}
          />
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
