import React from 'react';

import { cn } from '@/lib/utils';

export default function CartTerms() {
  const terms = [
    {
      id: 1,
      text: '장바구니에는 최대 20개까지 담을 수 있으며, 담긴 상품은 최대 2개월간 보관됩니다.',
    },
    {
      id: 2,
      text: '총 결제예정금액은 결제 단계에서 추가 할인 수단 적용으로 달라질 수 있습니다.',
    },
    {
      id: 3,
      text: '가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.',
    },
  ];
  return (
    <ul className='bg-gray-200 mx-6 p-4 mb-10 text-text-900 text-caption3 space-y-1.5'>
      {terms.map(({ id, text }) => (
        <li
          key={id}
          className={cn(
            'relative pl-1.5',
            'before:block before:rounded-full before:absolute before:left-0 before:w-0.5 before:h-0.5 before:bg-text-900 before:top-[5px]',
          )}
        >
          {text}
        </li>
      ))}
    </ul>
  );
}
