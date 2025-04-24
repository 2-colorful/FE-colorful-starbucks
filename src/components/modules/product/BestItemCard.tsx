'use client';
import { getProductSimple } from '@/actions/product-service';
import Tag from '@/components/ui/main/Tag';
import { SimpleProduct } from '@/types/products/productTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RankingBadge from './RankingBadge';

export default function BestItemCard({
  productCode,
  ranking,
}: {
  productCode: number;
  ranking: number;
}) {
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
    return <></>;
  }

  if (!product) return null;
  return (
    <div className='w-full mt-3'>
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
        <RankingBadge ranking={ranking} />
      </button>
      <Tag isBest={true} isNew={product.isNew} />
      <h3 className='text-button2 my-3'>{product.productName}</h3>
      <p className='text-subtitle2'>{product.price.toLocaleString()}원</p>
    </div>
  );
}
