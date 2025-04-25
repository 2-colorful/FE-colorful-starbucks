'use client';
import type React from 'react';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

interface ShoppingInfoItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function ShoppingInfoItem({
  icon,
  title,
  href,
  onClick,
}: ShoppingInfoItemProps) {
  return (
    <Link
      href={href}
      className='flex items-center justify-between py-2 group'
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        {icon}
        <span className='text-base'>{title}</span>
      </div>
      <ChevronRight className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors' />
    </Link>
  );
}
