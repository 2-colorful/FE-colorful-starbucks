'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import UpIcon from '@/assets/icons/common/up.svg';
import { cn } from '@/lib/utils';

export default function SortProducts() {
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'createdAt,desc', label: '신상품순' },
    { value: 'createdAt,asc', label: '구상품순' },
    { value: 'price,asc', label: '낮은가격순' },
    { value: 'price,desc', label: '높은가격순' },
  ];

  const currentSortValue = searchParamsObj.get('sortBy') || '';

  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSortValue)?.label ||
    '신상품순';

  const handleSortSelect = (sortValue: string) => {
    const params = new URLSearchParams(searchParamsObj.toString());

    params.delete('cursor');

    if (sortValue) {
      params.set('sortBy', sortValue);
    } else {
      params.delete('sortBy');
    }

    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative ' ref={dropdownRef}>
      <button
        className='flex items-center justify-between w-full px-4 py-2 text-sm whitespace-nowrap'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='mr-1'>{currentSortLabel}</span>
        <UpIcon />
      </button>

      {isOpen && (
        <ul className='absolute z-10 w-full mt-1 mr-1 bg-white border border-gray-300 rounded-md shadow-lg truncate whitespace-nowrap'>
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  'block w-full text-center px-4 py-3 text-sm hover:bg-gray-100',
                  currentSortValue === option.value
                    ? 'text-primary-100 font-medium'
                    : 'text-gray-700',
                )}
                onClick={() => handleSortSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
