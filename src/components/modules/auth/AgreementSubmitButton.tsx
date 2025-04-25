import { cn } from '@/lib/utils';
import React from 'react';

import { Button } from '@/components/ui/common';

export default function AgreementSubmitButton({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <div className='w-full fixed bottom-0 pb-5 left-0 bg-white px-7 pt-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
      <Button
        type='submit'
        variant='default'
        width='auto'
        className={cn(
          'w-full text-lg font-bold py-6',
          !isActive && 'bg-[#E0E0E0] pointer-events-none',
        )}
      >
        다음
      </Button>
    </div>
  );
}
