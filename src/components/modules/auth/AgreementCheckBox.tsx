import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AgreementCheckboxProps {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
  onChange: () => void;
  hasLink?: boolean;
}

export default function AgreementCheckbox({
  id,
  label,
  required,
  checked,
  onChange,
  hasLink = true,
}: AgreementCheckboxProps) {
  return (
    <div className='flex items-center gap-2 py-4 relative'>
      <input
        id={id}
        type='checkbox'
        className='text-lg font-bold'
        data-required={required}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      {hasLink && (
        <Link href='/' className={cn('absolute right-0')}>
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
