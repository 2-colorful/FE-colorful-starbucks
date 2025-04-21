import Image from 'next/image';
import React from 'react';

import { getProduct } from '@/actions/product-service';
import RecentProductSkeleton from '@/components/modules/product/RecentProductSkeleton';

export default async function ProductItemCard({
  productCode,
}: {
  productCode: number;
}) {
  const product = await getProduct(productCode);

  if (!product) {
    return <RecentProductSkeleton />;
  }

  return (
    <article className='flex items-center py-4 '>
      <div className='w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0'>
        <Image
          src={product.productThumbnailUrl || '/placeholder.svg'}
          alt={product.productName || '상품 이미지'}
          unoptimized={true}
          height={64}
          width={64}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex-1'>
        <h3 className='text-sm text-gray-800 mb-1'>{product.productName}</h3>
        <p className='text-base font-semibold'>
          {product.price.toLocaleString()}원
        </p>
      </div>
    </article>
  );
}
