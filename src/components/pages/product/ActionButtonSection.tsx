import React from 'react';

import CartIcon from '@/assets/icons/product/cart.svg';
import { Button } from '@/components/ui/common';

type ActionButtonSectionProps = {
  isOptionComplete: boolean;
  isPending: boolean;
  onAddToCart: () => void;
  onPurchase: () => void;
};

export default function ActionButtonSection({
  isOptionComplete,
  isPending,
  onAddToCart,
  onPurchase,
}: ActionButtonSectionProps) {
  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={onAddToCart}
        disabled={!isOptionComplete || isPending}
        className={`flex-shrink-0 cursor-pointer ${!isOptionComplete || isPending ? 'opacity-50 pointer-events-none' : ''}`}
        aria-label='장바구니에 추가'
      >
        <CartIcon />
      </button>
      <Button
        type='button'
        variant={isPending ? 'disabled' : 'default'}
        className='flex-grow'
        disabled={!isOptionComplete || isPending}
        label={isPending ? '처리 중...' : '구매하기'}
        onClick={onPurchase}
      />
    </div>
  );
}
