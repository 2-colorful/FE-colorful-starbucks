import { Body, SubTitle } from '@/components/ui/common';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/common/accordion';
import Coupon from '@/assets/icons/common/coupon.svg';

export default function CouponInfo() {
  return (
    <AccordionItem value='coupon' className='border-b border-stroke-100'>
      <AccordionTrigger className='rounded-none hover:no-underline'>
        <SubTitle>쿠폰</SubTitle>
      </AccordionTrigger>
      <AccordionContent className='grid grid-cols-[1fr_auto] items-center py-3 '>
        <div className='flex items-center gap-x-2.5'>
          <Coupon />
          <Body level={4}>쿠폰</Body>
        </div>
        <Body className='w-fit'>{'13,500'}원</Body>
      </AccordionContent>
    </AccordionItem>
  );
}
