import React from 'react';

import { getRecentlyProductsDummy } from '@/actions/product-service';
import RecentProductList from '@/components/pages/product/RecentProductList';
import DeleteAllRecentViewedProductButton from '@/components/modules/product/DeleteAllRecentViewedProductButton';
export const dynamic = 'force-dynamic';

export default async function RecentlyViewedPage() {
  // const recentProducts = await getRecentlyProducts();
  const recentProducts = await getRecentlyProductsDummy();
  return (
    <main>
      <div className='flex justify-end mr-3 mt-3'>
        <DeleteAllRecentViewedProductButton />
      </div>
      <RecentProductList recentProducts={recentProducts} />
    </main>
  );
}
