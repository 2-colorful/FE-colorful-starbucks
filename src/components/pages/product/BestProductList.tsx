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
      <ul>
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
