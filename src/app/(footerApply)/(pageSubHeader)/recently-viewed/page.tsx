import React from 'react';

import { getRecentlyProducts } from '@/actions/product-service';
import RecentProductList from '@/components/pages/product/RecentProductList';
import DeleteAllRecentViewedProductButton from '@/components/modules/product/DeleteAllRecentViewedProductButton';
export const dynamic = 'force-dynamic';

export default async function RecentlyViewedPage() {
  const recentProducts = await getRecentlyProducts();

  return (
    <main>
      {recentProducts.length > 0 ? (
        <>
          <div className='flex justify-end mr-3 mt-3'>
            <DeleteAllRecentViewedProductButton />
          </div>
          <RecentProductList recentProducts={recentProducts} />
        </>
      ) : (
        <div className='flex flex-col items-center justify-center h-60 mt-50 mb-50'>
          <p className='text-body1'>최근 본 상품이 없습니다</p>
        </div>
      )}
    </main>
  );
}
