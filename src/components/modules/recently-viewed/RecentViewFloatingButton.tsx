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
  const [hasRecentProduct, setHasRecentProduct] = useState(false);
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
    if (shouldHideButton) {
      setLoading(false);
      return;
    }

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

      if (response && response.trim() !== '') {
        setRecentProductThumbnailUrl(response);
        setHasRecentProduct(true);
      } else {
        setHasRecentProduct(false);
      }
    } catch (error) {
      console.error('최근 본 상품 썸네일 로딩 실패:', error);
      setHasRecentProduct(false);
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
        const thumbnailUrl = mostRecentItem.productThumbnailUrl || '';

        if (thumbnailUrl.trim() !== '') {
          setRecentProductThumbnailUrl(thumbnailUrl);
          setHasRecentProduct(true);
        } else {
          setHasRecentProduct(false);
        }
      } else {
        setHasRecentProduct(false);
      }
    } catch (error) {
      console.error('로컬스토리지 최근 본 상품 로딩 실패:', error);
      setHasRecentProduct(false);
    } finally {
      setLoading(false);
    }
  };

  if ((!hasRecentProduct && !loading) || shouldHideButton) {
    return null;
  }

  return (
    <div className='z-30 sticky bottom-7 w-full pointer-events-none'>
      <div className='max-w-3xl mx-auto relative'>
        <Link
          href='/recently-viewed'
          className='absolute bottom-15 right-5 w-12 h-12 rounded-full bg-white shadow-lg  flex items-center justify-center overflow-hidden pointer-events-auto'
        >
          {loading ? (
            <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
          ) : (
            <Image
              src={recentProductThumbnailUrl || '/placeholder.svg'}
              alt='최근 본 상품'
              width={48}
              height={48}
              unoptimized={true}
              className='object-cover w-full h-full opacity-70'
            />
          )}
        </Link>
      </div>
    </div>
  );
}
