import React from 'react';

export default function SearchSkeleton() {
  return (
    <div className='padded ml-4 mr-4 flex justify-center flex-col animate-pulse'>
      {/* 검색 결과 헤더 스켈레톤 */}
      <div className='mt-2 mb-4 flex justify-between items-center'>
        <div className='h-6 bg-gray-200 rounded w-40'></div>
        <div className='h-6 bg-gray-200 rounded w-24'></div>
      </div>

      {/* 상품 그리드 스켈레톤 */}
      <div className='grid grid-cols-2 gap-4'>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className='flex flex-col'>
              <div className='aspect-square bg-gray-200 rounded-md'></div>
              <div className='h-4 bg-gray-200 rounded mt-2 w-1/3'></div>
              <div className='h-5 bg-gray-200 rounded mt-2 w-2/3'></div>
              <div className='h-5 bg-gray-200 rounded mt-2 w-1/2'></div>
            </div>
          ))}
      </div>

      {/* 로딩 인디케이터 스켈레톤 */}
      <div className='flex justify-center mt-6'>
        <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
      </div>
    </div>
  );
}
