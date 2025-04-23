import React from 'react';

export default function RankingBadge({ ranking }: { ranking: number }) {
  return (
    <div className='absolute top-0 right-0 z-10'>
      <div className='flex items-center justify-center w-10 h-12 bg-green-500 text-white font-bold text-xl'>
        {ranking}
      </div>
      <div className='w-0 h-0 border-l-[20px] border-r-[20px] border-t-[12px] border-l-transparent border-r-transparent border-t-green-500'></div>
    </div>
  );
}
