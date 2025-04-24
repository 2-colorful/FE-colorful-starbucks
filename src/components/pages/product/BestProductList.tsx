import BestItemCard from '@/components/modules/product/BestItemCard';
import { BestProductType } from '@/types/products/bestProductTypes';
import React from 'react';

export default function BestProductList({
  products,
}: {
  products: BestProductType[];
}) {
  return (
    <section className='padded ml-4 mr-4 flex justify-center flex-col'>
      <ul className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10'>
        {products.map((product) => (
          <BestItemCard
            key={product.ranking}
            productCode={product.productCode}
            ranking={product.ranking}
          />
        ))}
      </ul>
    </section>
  );
}
