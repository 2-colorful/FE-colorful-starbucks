'use client';

import React from 'react';

export default function CategorySkeleton() {
  return (
    <ul className='w-full border-b boarder-stroke-100'>
      <div className='flex overflow-x-auto'>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item} className='flex-shrink-0'>
            <div className='h-12 w-24 bg-gray-200 animate-pulse rounded m-2'></div>
          </li>
        ))}
      </div>
    </ul>
  );
}
