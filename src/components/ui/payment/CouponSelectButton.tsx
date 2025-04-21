'use client';

import Coupon from '@/assets/icons/common/coupon.svg';
import { Body } from '../../ui/common';
import { useModalContext } from '@/context/ModalContext';
import CouponListModal from '@/components/pages/payment/CouponListModal';

export default function CouponSelectButton({
  orderPrice,
}: {
  orderPrice?: number;
}) {
  console.log('🚀 ~ orderPrice:', orderPrice);
  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(<CouponListModal orderPrice={orderPrice} />);
  };
  return (
    <button onClick={handleClick} className='flex items-center gap-x-2.5'>
      <Coupon />
      <Body level={4}>쿠폰</Body>
    </button>
  );
}
