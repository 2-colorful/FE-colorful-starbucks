import { Body, SubTitle } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';

type TotalPaymentProps = {
  paymentData: {
    orderPrice: number;
    totalPrice: number;
    totalDiscountPrice: number;
  };
};

export default async function TotalPayment({ paymentData }: TotalPaymentProps) {
  return (
    <section className='bg-gray-300 p-6'>
      <ul className='gap-y-2.5 grid'>
        <li>
          <Body level={3} className='flex w-full justify-between'>
            <span>주문 금액</span>
            <span>{paymentData.orderPrice.toLocaleString()}원</span>
          </Body>
        </li>
        <li>
          <Body level={3} className='flex w-full justify-between'>
            <span>쿠폰 할인</span>
            <span>{priceFormatter(paymentData.totalDiscountPrice)}원</span>
          </Body>
        </li>
      </ul>
      <SubTitle level={1} className='flex w-full justify-between mt-5'>
        <span>최종 결제 금액</span>
        <span className='text-primary-100'>
          {paymentData.totalPrice.toLocaleString()}원
        </span>
      </SubTitle>
    </section>
  );
}
