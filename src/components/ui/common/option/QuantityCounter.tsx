'use client';
import { cn } from '@/lib/utils';
import { Body } from '../Typography';
import Plus from '@/assets/icons/cart/plus.svg';
import Minus from '@/assets/icons/cart/minus.svg';

type QuantityCounterProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  max?: number;
  min?: number;
  className?: string;
};

export default function QuantityCounter({
  quantity,
  setQuantity,
  min = 1,
  max,
  className,
}: QuantityCounterProps) {
  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div
      className={cn(
        'w-full grid grid-cols-[1fr_auto] items-center py-4',
        className,
      )}
    >
      <Body>수량</Body>
      <div className='flex items-center gap-2 w-fit border border-stroke-100 rounded-sm overflow-hidden'>
        <QuantityButton
          type='button'
          disabled={quantity <= min}
          onClick={handleDecrease}
          className='border-r'
        >
          <Minus />
        </QuantityButton>
        <p className='w-10 text-center'>{quantity}</p>
        <QuantityButton
          type='button'
          disabled={!max || quantity >= max}
          onClick={handleIncrease}
          className='border-l'
        >
          <Plus />
        </QuantityButton>
      </div>
    </div>
  );
}

const QuantityButton = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={cn(
        'px-2.5 py-2.5 cursor-pointer',
        'disabled:cursor-default disabled:bg-gray-200 disabled:text-text-500',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
