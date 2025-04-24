import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { getProductSimple } from '@/actions/product-service';
import Tag from '@/components/ui/main/Tag';

export default async function EventProductItem({
  productCode,
}: {
  productCode: number;
}) {
  const product = await getProductSimple(productCode);

  if (!product) return;

  return (
    <div className='w-full'>
      <Link href={`/product/${productCode}`}>
        <div className='relative aspect-square w-full mb-2'>
          <Image
            src={product.productThumbnailUrl}
            alt={product.productName}
            className='rounded-[4px]'
            fill
            sizes='100%'
          />
        </div>
      </Link>
      <Tag isMarkable={true} />
      <h3 className='text-button2 my-3'>{product.productName}</h3>
      <p className='text-subtitle2'>{product.price.toLocaleString()}원</p>
    </div>
  );
}
