import React from 'react';

export default function RankingBadge({ ranking }: { ranking: number }) {
  return (
    <div className='absolute top-0 left-2 z-1'>
      <div className='flex items-center justify-center w-5 h-6 bg-primary-100 text-white font-bold text-body4'>
        {ranking}
      </div>
      <div className='w-0 h-0 border-l-[10px] border-r-[10px] border-t-[6px] border-l-transparent border-r-transparent border-primary-100'></div>
    </div>
  );
}
