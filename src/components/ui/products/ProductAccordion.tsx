'use client';
import { useState } from 'react';

import { ProductAccordionPropsType } from '@/types/products/productAccordionProps';

export default function ProductAccordion({
  title,
  content,
}: ProductAccordionPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-t border-b'>
      <button
        className='py-4 w-full flex justify-between items-center cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? '상세정보 접기' : '상세정보 펼치기'}
      >
        <span className='font-medium text-left'>{title}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
          className='transition-transform duration-300'
        >
          <polyline points='6 9 12 15 18 9' />
        </svg>
      </button>

      {isOpen && (
        <div className='px-2 pb-4'>
          <p className='text-sm text-gray-600'>{content}</p>
        </div>
      )}
    </div>
  );
}
