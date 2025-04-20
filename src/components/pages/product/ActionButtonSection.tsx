import React from 'react';

import CartIcon from '@/assets/icons/product/cart.svg';
import { Button } from '@/components/ui/common';

type ActionButtonSectionProps = {
  isOptionComplete: boolean;
  onAddToCart: () => void;
  onPurchase: () => void;
};

export default function ActionButtonSection({
  isOptionComplete,
  onAddToCart,
  onPurchase,
}: ActionButtonSectionProps) {
  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={onAddToCart}
        disabled={!isOptionComplete}
        className={`flex-shrink-0 cursor-pointer ${!isOptionComplete ? 'opacity-50 pointer-events-none' : ''}`}
        aria-label='장바구니에 추가'
      >
        <CartIcon />
      </button>
      <Button
        type='button'
        disabled={!isOptionComplete}
        className='flex-grow'
        onClick={onPurchase}
      >
        구매하기
      </Button>
    </div>
  );
}
