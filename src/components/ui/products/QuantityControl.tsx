import React from 'react';

import { Button } from '../common';

type QuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'default' | 'sm';
};
export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  size = 'default',
}: QuantityControlProps) {
  const buttonSize =
    size === 'default' ? 'h-8 p-0 w-8 min-w-8' : 'h-7 p-0 w-7 min-w-7';
  const textSize = size === 'default' ? 'w-10' : 'w-8';

  return (
    <div className='flex items-center border rounded-md bg-white'>
      <Button variant='ghost' onClick={onDecrease} className={buttonSize}>
        -
      </Button>
      <span className={`${textSize} text-center py-1`}>{quantity}</span>
      <Button variant='ghost' onClick={onIncrease} className={buttonSize}>
        +
      </Button>
    </div>
  );
}
