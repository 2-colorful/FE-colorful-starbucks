'use client';
import Image from 'next/image';
import Link from 'next/link';

import Tag from '../../ui/main/Tag';
import { SimpleProduct } from '@/types/products/productTypes';

export default function ProductItem({
  productCode,
  productDetails,
}: {
  productCode: number;
  productDetails: SimpleProduct;
}) {
  return (
    <div className='w-full'>
      <Link href={`/product/${productCode}`}>
        <div className='relative aspect-square w-full'>
          <Image
            src={productDetails.productThumbnailUrl}
            alt={productDetails.productName}
            className='rounded-[4px]'
            fill
            sizes='100%'
          />
        </div>
      </Link>

      <Tag isMarkable={true} />
      <h3 className='text-button2 my-3 '>{productDetails.productName}</h3>
      <p className='text-subtitle2'>
        {productDetails.price.toLocaleString()}원
      </p>
    </div>
  );
}
