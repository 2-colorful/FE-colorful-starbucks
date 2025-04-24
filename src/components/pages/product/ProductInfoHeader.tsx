import React from 'react';
import Image from 'next/image';

import Close from '@/assets/icons/common/close.svg';
import { Body, SubTitle } from '@/components/ui/common';

type ProductInfoHeaderProps = {
  productName: string;
  productPrice: number;
  productThumbnailUrl: string;
  onClose: () => void;
};

export default function ProductInfoHeader({
  productName,
  productPrice,
  productThumbnailUrl,
  onClose,
}: ProductInfoHeaderProps) {
  return (
    <>
      <div className='flex justify-between items-center pb-6'>
        <SubTitle>상품 옵션 선택</SubTitle>
        <button type='button' onClick={onClose} aria-label='닫기'>
          <Close width={20} height={20} className='*:fill-text-900' />
        </button>
      </div>

      <div className='flex items-center gap-3 pb-4 mb-4 border-b border-stroke-100'>
        <div className='w-16 h-16 relative rounded-sm overflow-hidden'>
          <Image
            src={productThumbnailUrl}
            alt={productName}
            fill
            className='object-cover'
            sizes='64px'
          />
        </div>
        <div>
          <Body className='line-clamp-1'>{productName}</Body>
          <Body className='font-bold'>{productPrice.toLocaleString()}원</Body>
        </div>
      </div>
    </>
  );
}
