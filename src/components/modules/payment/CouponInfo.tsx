import { Body, SubTitle } from '@/components/ui/common';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/common/accordion';
import type { CouponDataType } from '@/types/responseDataTypes';
import CouponSelectButton from '@/components/ui/payment/CouponSelectButton';
import { priceFormatter } from '@/lib/priceFormatter';
import SelectCouponAccordion from '@/components/ui/payment/SelectCouponAccordion';

export default async function CouponInfo({
  couponData,
  orderPrice,
}: {
  couponData?: CouponDataType;
  orderPrice: number;
}) {
  if (!couponData) return <SelectCouponAccordion />;

  return (
    <AccordionItem value='coupon' className='border-b border-stroke-100'>
      <AccordionTrigger className='rounded-none hover:no-underline'>
        <SubTitle>쿠폰</SubTitle>
      </AccordionTrigger>
      <AccordionContent className='grid grid-cols-[1fr_auto] items-center py-3'>
        <CouponSelectButton orderPrice={orderPrice} />
        <Body className='w-fit'>
          {priceFormatter(couponData.discountValue)}원
        </Body>
      </AccordionContent>
    </AccordionItem>
  );
}
