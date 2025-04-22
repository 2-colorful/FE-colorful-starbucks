'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDownToLine, Check, ShoppingBag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { priceFormatter } from '@/lib/priceFormatter';

interface CouponProps {
  id: string;
  couponName: string;
  couponDescription: string;
  discountType: 'FIXED_AMOUNT' | 'PERCENTAGE';
  discountValue: number;
  couponImageUrl: string;
  maxDiscountAmount: number;
  minOrderAmount: number;
  startAt: string;
  expiredAt: string;
}

interface CouponItemProps {
  coupon: CouponProps;
  variant: 'receive' | 'possession';
}

export default function CouponItem({ coupon, variant }: CouponItemProps) {
  const [isReceived, setIsReceived] = useState(false);

  const handleGetCoupon = (couponId: string) => {
    console.log('get coupon', couponId);
    // 실제로는 여기서 API 호출을 통해 쿠폰을 발급받음
    // fetch('/api/coupons/receive', { method: 'POST', body: JSON.stringify({ couponId }) })

    // 성공적으로 발급 받았다고 가정하고 상태 변경
    setIsReceived(true);
  };

  const handleUseCoupon = (couponId: string) => {
    console.log('use coupon', couponId);
    // 실제로는 여기서 쿠폰 사용 페이지로 이동하거나 쿠폰 사용 로직 실행
    // router.push(`/checkout?couponId=${couponId}`)
  };

  // 할인 정보 표시
  const renderDiscountInfo = () => {
    if (coupon.discountType === 'FIXED_AMOUNT') {
      return `${priceFormatter(coupon.discountValue)}원 할인`;
    } else {
      return `${coupon.discountValue}% 할인`;
    }
  };

  // 사용 기간 포맷팅
  const formatPeriod = () => {
    const start = formatDate(coupon.startAt);
    const end = formatDate(coupon.expiredAt);
    return `${start} ~ ${end}`;
  };

  // 사용 조건 포맷팅
  const formatCondition = () => {
    let condition = `${priceFormatter(coupon.minOrderAmount)}원 이상 결제 시 사용 가능`;

    if (coupon.discountType === 'PERCENTAGE' && coupon.maxDiscountAmount > 0) {
      condition += `, 최대 ${priceFormatter(coupon.maxDiscountAmount)}원 할인`;
    }

    return condition;
  };

  return (
    <div className='space-y-3 border-b border-gray-100 pb-6'>
      <div className='flex justify-between items-center'>
        <p className='text-base leading-5 font-semibold text-green-600'>
          {renderDiscountInfo()}
        </p>

        {variant === 'receive' ? (
          <button
            type='button'
            className={`flex items-center gap-1 text-[13px] leading-5 font-medium transition-colors ${
              isReceived
                ? 'text-green-600 cursor-default'
                : 'text-gray-700 hover:text-green-600'
            }`}
            aria-label={
              isReceived ? '발급 완료' : `${coupon.couponName} 쿠폰 받기`
            }
            onClick={() => !isReceived && handleGetCoupon(coupon.id)}
            disabled={isReceived}
          >
            {isReceived ? (
              <>
                <Check size={18} />
                발급완료
              </>
            ) : (
              <>
                <ArrowDownToLine size={18} />
                쿠폰받기
              </>
            )}
          </button>
        ) : (
          <button
            type='button'
            className='flex items-center gap-1 text-[13px] leading-5 font-medium text-gray-700 hover:text-green-600 transition-colors'
            aria-label={`${coupon.couponName} 쿠폰 사용하기`}
            onClick={() => handleUseCoupon(coupon.id)}
          >
            <ShoppingBag size={18} />
            사용하기
          </button>
        )}
      </div>

      <h2 className='text-base leading-5 font-semibold'>{coupon.couponName}</h2>

      {coupon.couponDescription && (
        <p className='text-sm text-gray-600'>{coupon.couponDescription}</p>
      )}

      <div className='space-y-1 text-[12px] tracking-tighter text-gray-600'>
        <p>사용 기간 : {formatPeriod()}</p>
        <p>사용 조건 : {formatCondition()}</p>
        <Link
          href={`/coupon/detail/${coupon.id}`}
          className='text-[11px] tracking-tighter text-amber-700 underline hover:text-amber-800 transition-colors'
        >
          적용 대상 보기
        </Link>
      </div>
    </div>
  );
}
