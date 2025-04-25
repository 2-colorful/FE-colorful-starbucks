'use client';
import { useEffect, useContext } from 'react';

import { fetchRecentlyViewedItem } from '@/actions/product-service';
import { SessionContext } from '@/context/SessionContext';
import { storeRecentlyViewedProduct } from '@/lib/recently-viewed/utils';

interface RecentViewTrackerProps {
  productCode: number;
  productThumbnailUrl: string;
}

export default function RecentViewTracker({
  productCode,
  productThumbnailUrl,
}: RecentViewTrackerProps) {
  const isLoggedIn = useContext(SessionContext);

  useEffect(() => {
    // 페이지 체류 시간을 확인하기 위한 타이머
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        // 로그인 상태면 DB에 저장
        fetchRecentlyViewedItem(productCode, productThumbnailUrl).catch(
          (error) => console.error('최근 본 상품 DB 저장 실패:', error),
        );
      } else {
        // 비로그인 상태면 로컬스토리지에 저장
        storeRecentlyViewedProduct(productCode, productThumbnailUrl);
      }
    }, 1500); // 1.5초 후 실행 (페이지 이탈 방지)

    return () => clearTimeout(timer);
  }, [productCode, productThumbnailUrl, isLoggedIn]);

  return null; // UI 렌더링 없음
}
