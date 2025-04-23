import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../common/accordion';
import { SubTitle } from '../common';
import CouponSelectButton from './CouponSelectButton';

export default function SelectCouponAccordion({
  orderPrice,
}: {
  orderPrice?: number;
}) {
  return (
    <AccordionItem value='coupon' className='border-b border-stroke-100'>
      <AccordionTrigger className='rounded-none hover:no-underline'>
        <SubTitle>쿠폰</SubTitle>
      </AccordionTrigger>
      <AccordionContent className='grid grid-cols-[1fr_auto] items-center py-3'>
        <CouponSelectButton orderPrice={orderPrice} />
      </AccordionContent>
    </AccordionItem>
  );
}
