'use client';

import CouponItem from '@/components/modules/coupon/CouponItem';

interface CouponReceivePanelProps {
  isActive: boolean;
}

export default function CouponReceivePanel({
  isActive,
}: CouponReceivePanelProps) {
  if (!isActive) return null;

  const coupons = [
    {
      id: 'coupon1',
      couponName: '신규 가입 특별 할인 쿠폰',
      couponDescription: '신규 회원을 위한 특별 할인 혜택',
      discountType: 'FIXED_AMOUNT' as const,
      discountValue: 5000,
      couponImageUrl: '/images/coupon1.png',
      maxDiscountAmount: 5000,
      minOrderAmount: 10000,
      startAt: '2025-04-19T00:00:00',
      expiredAt: '2025-04-30T00:00:00',
    },
    {
      id: 'coupon2',
      couponName: '봄맞이 시즌 할인 쿠폰',
      couponDescription: '봄 시즌 상품 구매 시 할인',
      discountType: 'PERCENTAGE' as const,
      discountValue: 10,
      couponImageUrl: '/images/coupon2.png',
      maxDiscountAmount: 50000,
      minOrderAmount: 30000,
      startAt: '2025-04-01T00:00:00',
      expiredAt: '2025-04-30T23:59:59',
    },
  ];

  return (
    <section
      role='tabpanel'
      id='panel-receive'
      aria-labelledby='tab-receive'
      className='px-6'
    >
      <aside className='w-full rounded-md bg-gray-100 px-6 py-4'>
        <ul className='list-disc space-y-1 pl-5 text-[12px] text-gray-500'>
          <li>주문시 사용가능한 쿠폰입니다</li>
          <li>쿠폰을 받은 후 주문(결제) 시에 사용하세요</li>
        </ul>
      </aside>

      <div className='mt-4 space-y-6'>
        {coupons.map((coupon) => (
          <CouponItem key={coupon.id} coupon={coupon} variant='receive' />
        ))}
      </div>
    </section>
  );
}
