'use client';
import { useSearchParams } from 'next/navigation';

import { Button } from '../common';
import { useModalContext } from '@/context/ModalContext';
import DeliveryAddressSelectionModal from '@/components/pages/payment/DeliveryAddressSelectionModal';

export default function OrderAddressChangeButton() {
  const searchParams = useSearchParams();
  const { openModal } = useModalContext();

  const cartId = searchParams.getAll('cartId') || '';
  const couponUuid = searchParams.get('couponUuid');
  const params = new URLSearchParams();

  params.append('cartId', cartId.join(','));
  if (couponUuid) params.append('couponUuid', couponUuid);

  const handleClick = () => {
    openModal(<DeliveryAddressSelectionModal />);
  };

  return (
    <Button
      type='button'
      variant={'outline'}
      onClick={handleClick}
      className='px-3 py-1 text-caption2 h-7 active:bg-gray-100'
    >
      변경
    </Button>
  );
}
