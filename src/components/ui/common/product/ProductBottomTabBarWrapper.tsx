import React from 'react';

interface ProductBottomTabBarWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function ProductBottomTabBarWrapper({
  title,
  children,
}: ProductBottomTabBarWrapperProps) {
  return (
    <section
      className='w-full border-b border-stroke-100 py-4'
      aria-labelledby='bottom-tab-bar-title'
    >
      <div className='flex items-center px-4'>
        <h2
          id='bottom-tab-bar-title'
          className='text-body3 text-black font-bold w-20 shrink-0'
        >
          {title}
        </h2>
        <nav
          aria-label='하위 탭 메뉴'
          className='overflow-x-auto scrollbar-hidden ml-4'
        >
          <ul className='flex gap-6 min-w-max'>{children}</ul>
        </nav>
      </div>
    </section>
  );
}
