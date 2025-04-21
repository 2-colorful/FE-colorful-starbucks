'use client';

import { useEffect, useContext } from 'react';
import { fetchRecentlyViewedItem } from '@/actions/product-service';
import { SessionContext } from '@/context/SessionContext';

export default function RecentViewTracker({
  productCode,
  productThumbnailUrl,
}: {
  productCode: number;
  productThumbnailUrl: string;
}) {
  const isLoggedIn = useContext(SessionContext);

  useEffect(() => {
    if (isLoggedIn) {
      const registerRecentView = async () => {
        try {
          await fetchRecentlyViewedItem(productCode, productThumbnailUrl);
        } catch (error) {
          console.error('최근 본 상품 등록 실패:', error);
        }
      };

      const timer = setTimeout(() => {
        registerRecentView();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [productCode, productThumbnailUrl, isLoggedIn]);

  return null;
}
