'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';

import ScrollToTop from '@/assets/icons/common/scrollToTop.svg';
import {
  SCROLL_CONSTANTS,
  SCROLL_TO_TOP_HIDDEN_PATHS,
} from '@/data/common/commonData';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const shouldHideButton = SCROLL_TO_TOP_HIDDEN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}`),
  );

  const isProductsPage = pathname.includes('/products');

  const navPosition = isProductsPage ? 'bottom-8' : 'bottom-35';

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const scrollContainer = document.querySelector('.overflow-y-scroll');
        if (!scrollContainer) return;

        setIsVisible(
          scrollContainer.scrollTop > SCROLL_CONSTANTS.SCROLL_THRESHOLD,
        );
      }, SCROLL_CONSTANTS.THROTTLE_WAIT),
    [],
  );

  const scrollToTop = useCallback(() => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');
    if (!scrollContainer) return;

    const scrollStep =
      -scrollContainer.scrollTop / SCROLL_CONSTANTS.ANIMATION_STEPS;
    const scrollInterval = setInterval(() => {
      if (scrollContainer.scrollTop > 0) {
        scrollContainer.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, SCROLL_CONSTANTS.ANIMATION_INTERVAL);
  }, []);

  const effectCallback = useCallback(() => {
    if (shouldHideButton) {
      setIsVisible(false);
      return () => {};
    }

    const scrollContainer = document.querySelector('.overflow-y-scroll');
    if (!scrollContainer) return () => {};

    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, shouldHideButton]);

  useEffect(effectCallback, [effectCallback]);

  if (!isVisible || shouldHideButton) return null;

  return (
    <nav
      aria-label='페이지 맨 위로 스크롤'
      className={`z-30 sticky ${navPosition} w-full pointer-events-none`}
    >
      <div className='max-w-3xl mx-auto relative'>
        <button
          onClick={scrollToTop}
          type='button'
          className={`absolute bottom-0 right-5 p-3.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 pointer-events-auto`}
          aria-label='페이지 최상단으로 이동'
        >
          <ScrollToTop
            width={18}
            height={18}
            aria-hidden='true'
            className='text-text-900 cursor-pointer'
          />
        </button>
      </div>
    </nav>
  );
}
