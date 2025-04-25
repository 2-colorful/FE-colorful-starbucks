'use client';

import CouponItem from '@/components/modules/coupon/CouponItem';

interface CouponPossessionPanelProps {
  isActive: boolean;
}

export default function CouponPossessionPanel({
  isActive,
}: CouponPossessionPanelProps) {
  if (!isActive) return null;

  const coupons = [
    {
      id: 'coupon3',
      couponName: '생일 축하 특별 할인 쿠폰',
      couponDescription: '회원님의 생일을 축하합니다',
      discountType: 'PERCENTAGE' as const,
      discountValue: 15,
      couponImageUrl: '/images/coupon3.png',
      maxDiscountAmount: 10000,
      minOrderAmount: 20000,
      startAt: '2025-04-10T00:00:00',
      expiredAt: '2025-05-10T23:59:59',
    },
  ];

  return (
    <section
      role='tabpanel'
      id='panel-possession'
      aria-labelledby='tab-possession'
      className='px-6'
    >
      {coupons.length > 0 ? (
        <div className='mt-4 space-y-6'>
          {coupons.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} variant='possession' />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
          <p>보유한 쿠폰이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
