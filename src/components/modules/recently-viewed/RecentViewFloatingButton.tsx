'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { getRecentlyProducts } from '@/actions/product-service';
import { SessionContext } from '@/context/SessionContext';
import { RecentlyViewedProductItem } from '@/types/products/productTypes';

export default function RecentViewFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentProducts, setRecentProducts] = useState<
    RecentlyViewedProductItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useContext(SessionContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRecentProducts();
    }
  }, [isLoggedIn]);

  const fetchRecentProducts = async () => {
    try {
      setLoading(true);
      const data = await getRecentlyProducts();
      console.log('API 결과:', data);

      const allProducts = data.flatMap((day) => day.recentlyViewProducts);

      setRecentProducts(allProducts.slice(0, 3));
    } catch (error) {
      console.error('최근 본 상품 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoggedIn || (recentProducts.length === 0 && !loading)) {
    return null;
  }

  return (
    <div className='fixed bottom-25 right-5 z-50'>
      {isOpen && (
        <div className='flex flex-col items-center mb-2 animate-fade-in'>
          <Link
            href='/recently-viewed'
            className='w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center mb-2 shadow-md'
          >
            <span className='text-xs'>전체</span>
          </Link>

          {recentProducts.map((item, index) => (
            <Link
              href={`/product/${item.productCode}`}
              key={`${item.productCode}-${index}`}
              className='w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-md overflow-hidden'
            >
              <Image
                src={item.productThumbnailUrl || '/placeholder.svg'}
                alt='최근 본 상품'
                width={40}
                height={40}
                className='object-cover w-full h-full'
              />
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={toggleOpen}
        className='w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden'
      >
        {loading ? (
          <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
        ) : (
          <Image
            src={recentProducts[0]?.productThumbnailUrl || '/placeholder.svg'}
            alt='최근 본 상품'
            width={40}
            height={40}
            className='object-cover w-10 h-10'
          />
        )}
      </button>
    </div>
  );
}
