'use client';

import Loader from '@/components/ui/common/Loader';
import { useEffect, useRef } from 'react';

interface BottomScrollLoaderProps {
  hasMore: boolean;
  isLoading: boolean;
  onIntersect: () => void;
}

export default function BottomScrollLoader({
  hasMore,
  isLoading,
  onIntersect,
}: BottomScrollLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && hasMore) {
          onIntersect();
        }
      },
      { threshold: 1 },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loaderRef, isLoading, hasMore, onIntersect]);

  return (
    <>
      {!isLoading && hasMore && (
        <div
          ref={loaderRef}
          className='flex justify-center items-center h-20'
        ></div>
      )}
      {isLoading && hasMore && <Loader size='10' />}
    </>
  );
}
