import { Body, Caption, Title } from '../common';
import { priceFormatter } from '@/lib/priceFormatter';
import { dateFormatter, getRemainingDays } from '@/lib/dateFormatter';
import type { CouponDataType } from '@/types/responseDataTypes';
import { cn } from '@/lib/utils';

export default function CouponItem({
  coupon,
  orderPrice,
  handleClick,
}: {
  coupon: CouponDataType & { couponUuid: string };
  orderPrice?: number;
  handleClick: (couponUuid: string) => void;
}) {
  const isCouponActive = (totalPrice?: number, minOrderAmount?: number) => {
    return (totalPrice ?? 0) <= (minOrderAmount ?? 0);
  };
  return (
    <li
      className={cn(
        'w-full border border-stroke-100 rounded-lg overflow-hidden',
        !isCouponActive(orderPrice, coupon.minOrderAmount)
          ? 'hover:scale-[101%] active:scale-[101%] hover:shadow-1 active:shadow-1'
          : '*:disabled:bg-gray-100',
        'transition-all',
      )}
    >
      <button
        className='w-full cursor-pointer disabled:cursor-default'
        disabled={isCouponActive(orderPrice, coupon.minOrderAmount)}
        onClick={() => handleClick(coupon.couponUuid)}
      >
        <div className='p-4 space-y-3 text-left'>
          <Title level={1} className='text-primary-100'>
            {priceFormatter(coupon.discountValue)}
            <span className='pl-0.5 text-subtitle2'>
              {coupon.discountType === 'FIXED_AMOUNT' ? '원' : '%'}
            </span>
          </Title>

          <Body level={1}>
            {coupon.couponName}
            <span className='text-text-900 text-body4 pl-2'>
              {coupon.couponDescription}
            </span>
          </Body>
          <Body level={4} className='text-text-900'>
            {priceFormatter(coupon.minOrderAmount)}원 이상 구매 시 사용 가능
          </Body>
          {coupon.discountType === 'PERCENTAGE' ? (
            <Body>
              {priceFormatter(coupon.maxDiscountAmount)}까지 최대 할인
            </Body>
          ) : null}
        </div>

        <hr className='border-dashed' />

        <div className='grid grid-cols-[1fr_auto] p-4 w-full'>
          <Caption className='text-primary-200 text-left'>
            {getRemainingDays(coupon.expiredAt)}일 남음
          </Caption>
          <Caption className='w-fit text-text-500'>
            ~ {dateFormatter(coupon.expiredAt)}
          </Caption>
        </div>
      </button>
    </li>
  );
}
