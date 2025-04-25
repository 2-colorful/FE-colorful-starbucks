import React from 'react';
import { XIcon } from 'lucide-react';

import QuantityControl from './QuantityControl';
import { SelectedOptionType } from '@/types/products/productPurchaseTypes';

interface ExtendedSelectedOption extends SelectedOptionType {
  displayText: string;
}

interface SelectedOptionItemProps {
  option: ExtendedSelectedOption;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function SelectedOptionItem({
  option,
  onRemove,
  onQuantityChange,
}: SelectedOptionItemProps) {
  return (
    <div className='p-3 flex items-start justify-between gap-2'>
      <div className='flex-1'>
        <p className='text-sm'>{option.displayText}</p>
      </div>
      <div className='flex items-center gap-2'>
        <QuantityControl
          quantity={option.quantity}
          onIncrease={() => onQuantityChange(option.id, option.quantity + 1)}
          onDecrease={() => {
            if (option.quantity > 1) {
              onQuantityChange(option.id, option.quantity - 1);
            }
          }}
          size='sm'
        />
        <button
          type='button'
          onClick={() => onRemove(option.id)}
          className='p-1'
          aria-label='옵션 삭제'
        >
          <XIcon className='w-4 h-4 text-gray-400' />
        </button>
      </div>
    </div>
  );
}
