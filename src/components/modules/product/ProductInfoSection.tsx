'use client';
import dynamic from 'next/dynamic';

import { ProductTypes } from '@/types/products/productTypes';
import ProductInfo from '@/components/ui/products/ProductInfo';

interface ProductInfoSectionProps {
  product: ProductTypes;
}

export default function ProductInfoSection({
  product,
}: ProductInfoSectionProps) {
  const ProductImageHtml = dynamic(() => import('./ProductImageHtml'), {
    ssr: false,
  });
  return (
    <section>
      <div className='w-full z-20 bg-white pt-4'>
        <ProductInfo {...product} />
      </div>
      <div className='w-full mt-4'>
        <ProductImageHtml html={product.productImageUrl} />
      </div>
    </section>
  );
}
