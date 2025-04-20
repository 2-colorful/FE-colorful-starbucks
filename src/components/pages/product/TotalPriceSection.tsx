import React from 'react';

import { Body, SubTitle } from '@/components/ui/common';

type TotalPriceSectionProps = {
  quantity: number;
  totalPrice: number;
};

export default function TotalPriceSection({
  quantity,
  totalPrice,
}: TotalPriceSectionProps) {
  return (
    <div className='pb-6 grid grid-cols-2 items-center'>
      <Body className='w-fit'>
        총 <span className='text-primary-100'>{quantity}</span> 개
      </Body>
      <SubTitle className='text-right'>
        {totalPrice.toLocaleString()}
        <span className='text-body2'>원</span>
      </SubTitle>
    </div>
  );
}
