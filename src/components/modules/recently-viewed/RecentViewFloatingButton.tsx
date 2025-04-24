'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { SessionContext } from '@/context/SessionContext';
import { getRecentlyProductThumbnail } from '@/actions/product-service';
import { getRecentlyViewedProducts } from '@/lib/recently-viewed/utils';

export default function RecentViewFloatingButton() {
  const [recentProductThumbnailUrl, setRecentProductThumbnailUrl] =
    useState('');
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useContext(SessionContext);
  const pathname = usePathname();

  const hiddenPathList = [
    '/cart',
    '/payment',
    '/recently-viewed',
    '/my-page',
    '/orders',
    '/coupon',
    '/address',
    '/search',
  ];

  const shouldHideButton = hiddenPathList.some(
    (path) => pathname === path || pathname.startsWith(`${path}`),
  );

  useEffect(() => {
    if (shouldHideButton) return;

    if (isLoggedIn) {
      fetchRecentProducts();
    } else {
      fetchLocalRecentProduct();
    }
  }, [isLoggedIn, pathname, shouldHideButton]);

  const fetchRecentProducts = async () => {
    try {
      setLoading(true);
      const response = await getRecentlyProductThumbnail();
      setRecentProductThumbnailUrl(response);
    } catch (error) {
      console.error('최근 본 상품 썸네일 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocalRecentProduct = () => {
    try {
      setLoading(true);
      const recentItems = getRecentlyViewedProducts();

      if (recentItems && recentItems.length > 0) {
        const mostRecentItem = recentItems[0];
        setRecentProductThumbnailUrl(mostRecentItem.productThumbnailUrl || '');
      }
    } catch (error) {
      console.error('로컬스토리지 최근 본 상품 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if ((!recentProductThumbnailUrl && !loading) || shouldHideButton) {
    return null;
  }

  return (
    <div className='fixed bottom-20 right-5 z-50'>
      <Link
        href='/recently-viewed'
        className='w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden'
      >
        {loading ? (
          <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
        ) : (
          <Image
            src={recentProductThumbnailUrl || '/placeholder.svg'}
            alt='최근 본 상품'
            width={40}
            height={40}
            className='object-cover w-10 h-10 opacity-70'
          />
        )}
      </Link>
    </div>
  );
}
