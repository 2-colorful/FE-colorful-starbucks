'use client';

import { useState, useEffect } from 'react';

export function useScrollVisibility(delay = 1000) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const scrollListener = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (isVisible) {
        setIsVisible(false);
      }

      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, isVisible]);

  return isVisible;
}
