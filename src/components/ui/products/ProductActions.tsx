'use client';

import { useScrollVisibility } from '@/hooks/useScrollVisibility';
import CartIcon from '@/assets/icons/product/cart.svg';
import { cn } from '@/lib/utils';
import { ProductOptionDataType } from '@/types/responseDataTypes';
import { Button } from '../common';
import ProductOptionsModal from '@/components/pages/product/ProductOptionsModal';
import { useModalContext } from '@/context/ModalContext';

type ProductActionsProps = {
  productId: number;
  productPrice: number;
  productOptions: ProductOptionDataType;
  productName: string;
  productThumbnailUrl: string;
};

export default function ProductActions({
  productId,
  productPrice,
  productOptions,
  productName,
  productThumbnailUrl,
}: ProductActionsProps) {
  const { openModal } = useModalContext();

  const handlePurchaseClick = () => {
    openModal(
      <ProductOptionsModal
        productId={productId}
        productPrice={productPrice}
        productOptions={productOptions}
        productName={productName}
        productThumbnailUrl={productThumbnailUrl}
      />,
    );
  };

  const handleAddToCart = () => {
    handlePurchaseClick();
  };

  const isVisible = useScrollVisibility(500);

  return (
    <div
      className={cn(
        'fixed max-w-3xl bottom-0 left-1/2 w-full -translate-x-1/2 p-4 z-40',
        'bg-white rounded-t-2xl shadow-lg transition-all duration-500 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      )}
    >
      <div className='flex items-center gap-3 max-w-screen-lg mx-auto'>
        <CartIcon
          className='flex-shrink-0 cursor-pointer'
          onClick={handleAddToCart}
        />
        <Button
          variant='default'
          className='flex-grow'
          onClick={handlePurchaseClick}
        >
          구매하기
        </Button>
      </div>
    </div>
  );
}
