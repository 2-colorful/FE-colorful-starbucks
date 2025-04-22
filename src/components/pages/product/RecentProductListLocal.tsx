'use client';

import React, { useState, useEffect } from 'react';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';
import { formatDate } from '@/lib/utils';
import ProductItemCardLocal from '@/components/ui/common/product/ProductItemCardLocal';

interface RecentProductListLocalProps {
  recentProducts: DailyRecentlyViewedProductsType[];
}

export default function RecentProductListLocal({
  recentProducts: initialRecentProducts,
}: RecentProductListLocalProps) {
  // 로컬 상태로 관리하여 변경 사항을 즉시 반영
  const [recentProducts, setRecentProducts] = useState<
    DailyRecentlyViewedProductsType[]
  >(initialRecentProducts);

  // props가 변경되면 상태 업데이트
  useEffect(() => {
    setRecentProducts(initialRecentProducts);
  }, [initialRecentProducts]);

  // 개별 제품 삭제 처리
  const handleDeleteProduct = (productCode: number) => {
    // 날짜별 그룹에서 해당 상품 제거 후 빈 그룹은 제거
    const updatedProducts = recentProducts
      .map((group) => ({
        ...group,
        recentlyViewProducts: group.recentlyViewProducts.filter(
          (product) => product.productCode !== productCode,
        ),
      }))
      .filter((group) => group.recentlyViewProducts.length > 0);

    setRecentProducts(updatedProducts);
  };

  // 날짜별 그룹이 없으면 빈 화면 표시
  if (recentProducts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-60 mt-50 mb-50'>
        <p className='text-body1'>최근 본 상품이 없습니다</p>
        <p className='text-sm text-gray-500 mt-2'>
          로그인하면 최근 본 상품이 계정에 저장됩니다.
        </p>
      </div>
    );
  }

  return (
    <section className='m-4 mb-6 bg-white'>
      {recentProducts.map((products) => (
        <div
          key={products.viewedAt}
          className='border-b border-text-200 pb-5 mb-5'
        >
          <h2 className='text-sm font-medium mb-2'>
            {formatDate(products.viewedAt)}
          </h2>
          <div className='bg-white rounded-lg'>
            {products.recentlyViewProducts.map((product) => (
              <ProductItemCardLocal
                key={product.productCode}
                productCode={product.productCode}
                productThumbnailUrl={product.productThumbnailUrl}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
