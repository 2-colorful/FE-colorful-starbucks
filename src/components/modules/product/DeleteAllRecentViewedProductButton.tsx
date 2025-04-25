'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteAllRecentProducts } from '@/actions/product-service';

export default function DeleteAllRecentViewedProductButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteAll = async () => {
    if (isDeleting) return;

    if (confirm('최근 본 상품을 모두 삭제하시겠습니까?')) {
      try {
        setIsDeleting(true);
        await deleteAllRecentProducts();
        router.refresh();
      } catch (error) {
        console.error('전체 삭제 중 오류 발생:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteAll}
      disabled={isDeleting}
      className='text-sm font-medium text-text-900 disabled:opacity-50'
    >
      {isDeleting ? '삭제 중...' : '전체 삭제'}
    </button>
  );
}
