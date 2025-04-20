import { BottomSheet, Button, Caption, Heading } from '@/components/ui/common';
import { Accordion } from '@/components/ui/common/accordion';
import OrderInfo from '@/components/modules/payment/OrderInfo';
import CouponInfo from '@/components/modules/payment/CouponInfo';
import TotalPayment from '@/components/pages/payment/TotalPayment';
import { getCartDetail } from '@/actions/cart-service';
import OrderDelivery from '@/components/modules/payment/OrderDelivery';
import { priceFormatter } from '@/lib/priceFormatter';

type SearchParamType = {
  cartId?: string;
  orderId?: string;
  totalAmount?: string;
};

type PaymentPageProps = {
  searchParams: Promise<SearchParamType>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const orderSearchParams = await searchParams;

  const cartIds =
    orderSearchParams.cartId
      ?.split(',')
      .map((id) => ({ cartId: Number(id) })) || ([] as { cartId: number }[]);

  const cartDatas = await Promise.all(
    cartIds.map(async ({ cartId }) => {
      const data = await getCartDetail(cartId);

      return { ...data, cartId };
    }),
  );

  return (
    <main>
      <Heading.Wrapper>
        <Heading.Title>결제하기</Heading.Title>
      </Heading.Wrapper>

      <OrderDelivery />

      <section className='px-6 data-[slot=accordion-item]:border-none'>
        <Accordion type='multiple' defaultValue={['coupon']}>
          <OrderInfo cartDatas={cartDatas} />
          <CouponInfo />
        </Accordion>
      </section>

      <TotalPayment cartDatas={cartDatas} />

      <section className='pt-6 px-6 pb-20'>
        <Caption className='p-4 bg-gray-200 text-text-500'>
          위 주문 내용을 확인하였으며, 결제에 동의합니다.
          <br />
          (전자상거래법 8조 2항)
        </Caption>
      </section>

      <BottomSheet>
        <Button type='button' className='w-full'>
          {priceFormatter(Number(orderSearchParams?.totalAmount))}원 결제하기
        </Button>
      </BottomSheet>
    </main>
  );
}
