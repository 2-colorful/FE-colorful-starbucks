'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { ProductBottomTabBarWrapper } from '@/components/ui/common/product/ProductBottomTabBarWrapper';
import { PriceOptionType } from '@/data/category/categoryData';

type ProductPriceFilterRowProps = {
  title: string;
  priceOptions: PriceOptionType[];
};

export default function ProductPriceFilterRow({
  title,
  priceOptions,
}: ProductPriceFilterRowProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedOptionRef = useRef<HTMLAnchorElement>(null);

  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const selectedOption = priceOptions.find(
    (option) =>
      option.minPrice === currentMinPrice &&
      option.maxPrice === currentMaxPrice,
  );

  const updatePriceParams = (option: PriceOptionType) => {
    const params = new URLSearchParams(searchParams);
    const isSelected = option === selectedOption;

    if (isSelected) {
      params.delete('minPrice');
      params.delete('maxPrice');
    } else {
      if (option.minPrice) {
        params.set('minPrice', option.minPrice);
      } else {
        params.delete('minPrice');
      }

      if (option.maxPrice) {
        params.set('maxPrice', option.maxPrice);
      } else {
        params.delete('maxPrice');
      }
    }

    return params.toString();
  };

  useEffect(() => {
    if (selectedOption && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedOption]);

  return (
    <ProductBottomTabBarWrapper title={title}>
      {priceOptions.map((option) => {
        const isSelected = option === selectedOption;

        return (
          <Link
            key={option.priceOptionId}
            ref={isSelected ? selectedOptionRef : null}
            href={`${pathname}?${updatePriceParams(option)}`}
            replace
            className={`whitespace-nowrap text-body3 ${isSelected ? 'text-primary-100 font-black' : 'text-text-700'}`}
            scroll={false}
          >
            {option.filterName}
          </Link>
        );
      })}
    </ProductBottomTabBarWrapper>
  );
}
