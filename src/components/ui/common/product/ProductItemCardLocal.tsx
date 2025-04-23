'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct } from '@/actions/product-service';
import RecentProductSkeleton from '@/components/modules/product/RecentProductSkeleton';
import {
  LOCAL_STORAGE_KEY,
  RecentlyViewedItem,
} from '@/lib/recently-viewed/utils';

interface ProductData {
  productCode: number;
  productName: string;
  price: number;
  productThumbnailUrl?: string;
}

interface ProductItemCardLocalProps {
  productCode: number;
  productThumbnailUrl?: string;
  onDelete?: (productCode: number) => void; // 삭제 콜백 추가
}

export default function ProductItemCardLocal({
  productCode,
  productThumbnailUrl,
  onDelete,
}: ProductItemCardLocalProps) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // 삭제 상태 추가
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const productData = await getProduct(productCode);

        setProduct({
          ...productData,
          productThumbnailUrl:
            productThumbnailUrl || productData.productThumbnailUrl,
        });
      } catch (error) {
        console.error(`상품 ${productCode} 정보 로딩 실패:`, error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productCode, productThumbnailUrl]);

  const handleDelete = () => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItems) {
        const items = JSON.parse(storedItems) as RecentlyViewedItem[];
        const updatedItems = items.filter(
          (item) => item.productCode !== productCode,
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));

        // 로컬 상태 업데이트로 UI에서 즉시 사라지게 함
        setIsDeleted(true);

        // 부모 컴포넌트에 삭제 이벤트 알림
        if (onDelete) {
          onDelete(productCode);
        }

        // 백그라운드에서 페이지 데이터 리프레시
        router.refresh();
      }
    } catch (error) {
      console.error('상품 삭제 중 오류 발생:', error);
    }
  };

  // 삭제된 상태면 아무것도 렌더링하지 않음
  if (isDeleted) {
    return null;
  }

  if (loading) {
    return <RecentProductSkeleton />;
  }

  if (error || !product) {
    return <RecentProductSkeleton />;
  }

  return (
    <article className='flex items-center py-4'>
      <div className='w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0'>
        <Image
          src={product.productThumbnailUrl || '/placeholder.svg'}
          alt={product.productName || '상품 이미지'}
          unoptimized={true}
          height={64}
          width={64}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex-1'>
        <h3 className='text-sm text-gray-800 mb-1'>{product.productName}</h3>
        <p className='text-base font-semibold'>
          {product.price.toLocaleString()}원
        </p>
      </div>

      <div className='ml-2'>
        <button
          onClick={handleDelete}
          className='text-gray-500 hover:text-gray-700 focus:outline-none'
          aria-label='삭제'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </button>
      </div>
    </article>
  );
}
