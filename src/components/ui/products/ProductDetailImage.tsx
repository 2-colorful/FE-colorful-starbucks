import Image from 'next/image';
import React from 'react';

import { ProductImageProps } from '@/types/products/productImageProps';

export default function ProductDetailImage({
  imageUrl,
  name,
}: ProductImageProps) {
  return (
    <div className='aspect-square relative bg-gray-100'>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name || '상품 이미지'}
          unoptimized={true}
          fill
          className='object-contain'
          priority
        />
      )}
    </div>
  );
}
