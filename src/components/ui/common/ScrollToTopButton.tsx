'use client';
import { useEffect, useState, useMemo } from 'react';
import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';

import ScrollToTop from '@/assets/icons/common/scrollToTop.svg';

const THROTTLE_WAIT = 300;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const hiddenPathList = [
    '/cart',
    '/payment',
    '/my-page',
    '/orders',
    '/coupon',
    '/address',
    '/search',
    '/sign',
    '/pay',
  ];

  const shouldHideButton = hiddenPathList.some(
    (path) => pathname === path || pathname.startsWith(`${path}`),
  );

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const scrollContainer = document.querySelector('.overflow-y-scroll');
        if (!scrollContainer) return;

        setIsVisible(scrollContainer.scrollTop > 100);
      }, THROTTLE_WAIT),
    [],
  );

  useEffect(() => {
    if (shouldHideButton) {
      setIsVisible(false);
      return;
    }

    const scrollContainer = document.querySelector('.overflow-y-scroll');
    if (!scrollContainer) return;

    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, shouldHideButton, pathname]);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');
    if (!scrollContainer) return;

    const scrollStep = -scrollContainer.scrollTop / 20;
    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollTop > 0) {
        scrollContainer.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  if (!isVisible || shouldHideButton) return null;

  return (
    <div className='z-30 sticky bottom-21 w-full pointer-events-none'>
      <div className='max-w-3xl mx-auto relative'>
        <button
          onClick={scrollToTop}
          className='absolute bottom-15 right-5 p-3.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 pointer-events-auto'
          aria-label='최상단 이동'
        >
          <ScrollToTop
            width={18}
            height={18}
            className='text-text-900 cursor-pointer'
          />
        </button>
      </div>
    </div>
  );
}
