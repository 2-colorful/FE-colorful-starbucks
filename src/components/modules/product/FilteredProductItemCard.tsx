'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Tag from '../../ui/main/Tag';
import { getProductSimple } from '@/actions/product-service';
import FilteredProductItemCardSkelton from './FilteredProductItemCardSkelton';
import { SimpleProduct } from '@/types/products/productTypes';

interface FilteredProductCardProps {
  productCode: number;
}

export default function FilteredProductItemCard({
  productCode,
}: FilteredProductCardProps) {
  const [product, setProduct] = useState<SimpleProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProductSimple(productCode);
        setProduct(productDetail);
      } catch (error) {
        console.error('상품 정보 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productCode]);
  const ClickToProductDetailPage = async () => {
    router.push(`/product/${product?.productCode}`);
  };

  if (loading) {
    return <FilteredProductItemCardSkelton />;
  }
  if (!product) return;

  return (
    <div className='w-full'>
      <button
        onClick={ClickToProductDetailPage}
        className='relative aspect-square w-full mb-2'
      >
        <Image
          src={product.productThumbnailUrl}
          alt={product.productName}
          unoptimized={true}
          className='rounded-[4px]'
          fill
          sizes='100%'
        />
      </button>
      <Tag isNew={product.isNew} />
      <h3 className='text-button2 my-3'>{product.productName}</h3>
      <p className='text-subtitle2'>{product.price.toLocaleString()}원</p>
    </div>
  );
}
