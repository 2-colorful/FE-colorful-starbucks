'use client';

import React, { useState, useEffect } from 'react';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';
import { formatDate } from '@/lib/utils';
import ProductItemCardLocal from '@/components/ui/common/product/ProductItemCardLocal';

interface RecentProductListLocalProps {
  recentProducts: DailyRecentlyViewedProductsType[];
  onDeleteProduct?: (productCode: number) => void;
}

export default function RecentProductListLocal({
  recentProducts: initialRecentProducts,
  onDeleteProduct,
}: RecentProductListLocalProps) {
  const [recentProducts, setRecentProducts] = useState<
    DailyRecentlyViewedProductsType[]
  >(initialRecentProducts);

  useEffect(() => {
    setRecentProducts(initialRecentProducts);
  }, [initialRecentProducts]);

  const handleDeleteProduct = (productCode: number) => {
    const updatedProducts = recentProducts
      .map((group) => ({
        ...group,
        recentlyViewProducts: group.recentlyViewProducts.filter(
          (product) => product.productCode !== productCode,
        ),
      }))
      .filter((group) => group.recentlyViewProducts.length > 0);

    setRecentProducts(updatedProducts);

    if (onDeleteProduct) {
      onDeleteProduct(productCode);
    }
  };

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
