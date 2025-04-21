'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Modal } from '@/components/ui/common/Modal';
import { SubTitle } from '@/components/ui/common';
import Close from '@/assets/icons/common/close.svg';
import { useModalContext } from '@/context/ModalContext';
import { CouponDataType } from '@/types/responseDataTypes';
import { getCouponDetail, getMemberCoupon } from '@/actions/coupon-service';
import CouponItem from '@/components/ui/coupon/CouponItem';

export default function CouponListModal({
  orderPrice,
}: {
  orderPrice?: number;
}) {
  const router = useRouter();

  const { closeModal } = useModalContext();

  const searchParams = useSearchParams();
  const cartId = searchParams.getAll('cartId');
  const memberAddressUuid = searchParams.get('memberAddressUuid');

  const [couponData, setCouponData] = useState<
    (CouponDataType & { couponUuid: string })[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const { content } = await getMemberCoupon();
      const coupons = await Promise.all(
        content.map(async (coupon) => {
          const result = await getCouponDetail(coupon.couponUuid);
          return {
            ...result,
            couponUuid: coupon.couponUuid,
          } as CouponDataType & { couponUuid: string };
        }),
      );

      if (coupons) setCouponData(coupons);
    })();
  }, []);

  const handleClick = (couponUuid: string) => {
    const params = new URLSearchParams();

    params.append('cartId', cartId.join(','));
    if (memberAddressUuid)
      params.append('memberAddressUuid', memberAddressUuid);
    params.append('couponUuid', couponUuid);

    router.replace(`/payment?${params.toString()}`);
    closeModal();
  };

  return (
    <Modal variant='bottomSheet' className='py-6 max-h-10/12 h-full'>
      <div className='grid grid-cols-[1fr_auto] px-6 mb-6'>
        <SubTitle level={1}>쿠폰 선택</SubTitle>
        <button onClick={() => closeModal()}>
          <Close width={16} height={16} className='*:fill-text-900' />
        </button>
      </div>

      <ul className='px-6'>
        {couponData?.map((coupon) => (
          <CouponItem
            key={coupon.couponUuid}
            coupon={coupon}
            orderPrice={orderPrice}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </Modal>
  );
}
