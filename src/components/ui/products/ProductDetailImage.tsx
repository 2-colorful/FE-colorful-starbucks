import Image from 'next/image';
import React from 'react';

import { ProductImagePropsType } from '@/types/products/productImageProps';

export default function ProductDetailImage({
  imageUrl,
  name,
}: ProductImagePropsType) {
  return (
    <div className='aspect-square relative bg-gray-100'>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name || '상품 이미지'}
          fill
          className='object-contain'
          priority
        />
      )}
    </div>
  );
}
