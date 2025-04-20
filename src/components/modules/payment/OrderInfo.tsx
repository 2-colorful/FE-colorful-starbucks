import { Body, SubTitle } from '@/components/ui/common';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/common/accordion';
import OrderDetailCard from '../../ui/payment/OrderDetailCard';
import OrderPreviewCard from '@/components/ui/payment/OrderPreviewCard';
import { CartDetailType } from '@/types/responseDataTypes';

type OrderInfoProps = {
  cartDatas: CartDataType[];
};

interface CartDataType extends CartDetailType {
  cartId: number;
}

export default function OrderInfo({ cartDatas }: OrderInfoProps) {
  return (
    <AccordionItem
      value='order'
      className='border-b border-stroke-100 group'
      defaultChecked
    >
      <AccordionTrigger className='py-4 px-0 hover:no-underline'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <SubTitle className='text-lg font-medium'>주문내역</SubTitle>
            <Body level={4} className='text-sm text-gray-500'>
              상품 {cartDatas.length}개
            </Body>
          </div>

          <OrderPreviewCard {...cartDatas[0]} />
        </div>
      </AccordionTrigger>

      <AccordionContent className='py-3 space-y-4'>
        <ul>
          {cartDatas.map((item) => (
            <OrderDetailCard {...item} key={item.cartId} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
