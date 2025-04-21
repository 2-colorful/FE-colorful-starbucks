import { Body, BottomSheet, Button, SubTitle } from '@/components/ui/common';
import { calculateDiscount } from '@/lib/calculateDiscount';
import { priceFormatter } from '@/lib/priceFormatter';
import { CouponDataType } from '@/types/responseDataTypes';

type TotalPaymentProps = {
  orderPrice: number;
  couponData?: CouponDataType;
};

export default async function TotalPayment({
  orderPrice,
  couponData,
}: TotalPaymentProps) {
  const totalDiscountPrice =
    couponData?.discountType === 'FIXED_AMOUNT'
      ? couponData.discountValue
      : calculateDiscount(
          orderPrice,
          couponData?.discountValue,
          couponData?.maxDiscountAmount,
        );

  const totalPrice = orderPrice - totalDiscountPrice;

  return (
    <>
      <section className='bg-gray-300 p-6'>
        <ul className='gap-y-2.5 grid'>
          <li>
            <Body level={3} className='flex w-full justify-between'>
              <span>주문 금액</span>
              <span>{orderPrice.toLocaleString()}원</span>
            </Body>
          </li>
          <li>
            <Body level={3} className='flex w-full justify-between'>
              <span>쿠폰 할인</span>
              <span>{priceFormatter(totalDiscountPrice)}원</span>
            </Body>
          </li>
        </ul>
        <SubTitle level={1} className='flex w-full justify-between mt-5'>
          <span>최종 결제 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </SubTitle>
      </section>
      <BottomSheet>
        <Button type='button' className='w-full'>
          {priceFormatter(Number(totalPrice))}원 결제하기
        </Button>
      </BottomSheet>
    </>
  );
}
