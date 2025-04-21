'use client';

import ProductActions from './ProductActions';
import { ProductOptionDataType } from '@/types/responseDataTypes';

type ProductActionsWrapperProps = {
  productId: number;
  productPrice: number;
  productOptions: ProductOptionDataType;
  productName: string;
  productThumbnailUrl: string;
};

export default function ProductActionsWrapper({
  productId,
  productPrice,
  productOptions,
  productName,
  productThumbnailUrl,
}: ProductActionsWrapperProps) {
  return (
    <section>
      <div className='w-full z-30'>
        <ProductActions
          productId={productId}
          productPrice={productPrice}
          productOptions={productOptions}
          productName={productName}
          productThumbnailUrl={productThumbnailUrl}
        />
      </div>
    </section>
  );
}
