'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteRecentProduct } from '@/actions/product-service';

export default function DeleteRecentProductButton({
  productCode,
}: {
  productCode: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteRecentProduct(productCode);
      router.refresh();
    } catch (error) {
      console.error(`상품 ${productCode} 삭제 중 오류 발생:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className='text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50'
      aria-label='상품 삭제'
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}
