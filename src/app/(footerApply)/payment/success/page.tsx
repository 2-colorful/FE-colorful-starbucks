import Link from 'next/link';

import {
  getDefaultDeliveryAddress,
  getDetailDeliveryAddress,
} from '@/actions/address-service';
import { getCartDetail } from '@/actions/cart-service';
import { getCouponDetail } from '@/actions/coupon-service';
import { createOrder } from '@/actions/payment-service';
import {
  getProductDetail,
  getProudctDetailData,
} from '@/actions/product-service';
import Success from '@/assets/icons/common/success.svg';
import CouponInfo from '@/components/modules/payment/CouponInfo';
import OrderInfo from '@/components/modules/payment/OrderInfo';
import TotalPayment from '@/components/pages/payment/TotalPayment';
import { Body, Button, Title } from '@/components/ui/common';
import { Accordion } from '@/components/ui/common/accordion';
import { calculateDiscount } from '@/lib/calculateDiscount';
import { OrderDetailType } from '@/types/requestDataTypes';

interface PaymentSuccessPageProps {
  searchParams: Promise<SearchParamsType>;
}
type SearchParamsType = {
  paymentKey: string;
  amount: string;
  orderId: string;
  cartId: string;
  couponUuid?: string;
  memberAddressUuid?: string;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { paymentKey, orderId, couponUuid, memberAddressUuid, amount, cartId } =
    await searchParams;

  const cartIds =
    cartId.split(',').map((id) => ({ cartId: Number(id) })) ||
    ([] as { cartId: number }[]);

  const cartDatas = await Promise.all(
    cartIds.map(async ({ cartId }) => {
      const data = await getCartDetail(cartId);

      return { ...data, cartId };
    }),
  );

  const couponData = await getCouponDetail(couponUuid);

  const addressData = memberAddressUuid
    ? await getDetailDeliveryAddress(memberAddressUuid)
    : await getDefaultDeliveryAddress();

  if (!paymentKey || !amount || !cartId || !orderId! || !addressData) return;

  const selectedCartProducts = await Promise.all(
    cartDatas.map(async (item) => {
      const data = await getProudctDetailData(item.productDetailCode);

      return data.price * item.quantity;
    }),
  );

  const orderPrice = selectedCartProducts.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const totalDiscountPrice =
    couponData?.discountType === 'FIXED_AMOUNT'
      ? couponData.discountValue
      : calculateDiscount(
          orderPrice,
          couponData?.discountValue,
          couponData?.maxDiscountAmount,
        );

  const totalPrice = orderPrice - totalDiscountPrice;

  const orderDetails: OrderDetailType[] = await Promise.all(
    cartDatas.map(async (item) => {
      const productDetail = await getProudctDetailData(item.productDetailCode);
      const product = await getProductDetail(item.productCode);

      return {
        productCode: item.productCode,
        productDetailCode: item.productDetailCode,
        productName: product.productName,
        sizeName: productDetail.sizeName,
        colorName: productDetail.colorName,
        quantity: item.quantity,
        price: productDetail.price,
        carving: item.carvingContent ? true : false,
      };
    }),
  );

  await createOrder({
    orderDetails,
    orderCode: Number(orderId),
    receiverName: addressData?.receiverName,
    totalAmount: totalPrice,
    couponUuid: couponUuid,
    discountAmount: totalDiscountPrice,
    memberAddressUuid: memberAddressUuid
      ? memberAddressUuid
      : addressData?.memberAddressUuid,
  });

  return (
    <main>
      <section className='mx-6 pt-12 pb-6 text-center space-y-2 border-b border-stroke-100'>
        <Success className='mx-auto' />
        <Title>주문이 완료되었습니다.</Title>
        <Body
          level={3}
          className='text-text-900 hover:underline active:underline'
        >
          <Link href={`/orders/${orderId}`}>주문번호 {orderId}</Link>
        </Body>
        <div className='space-x-4 pt-8 '>
          <Button variant={'outline'} className='h-9 px-4 text-body3' asChild>
            <Link href={'/'}>홈으로 가기</Link>
          </Button>
          <Button
            variant={'default'}
            className='h-9 px-4 !text-body3 text-white'
            asChild
          >
            <Link href={'/orders'}>주문내역 보기</Link>
          </Button>
        </div>
      </section>

      <section className='px-6 pt-4'>
        <Accordion type='multiple' defaultValue={['order']}>
          <OrderInfo cartDatas={cartDatas} />
          <CouponInfo couponData={couponData} orderPrice={orderPrice} />
        </Accordion>
      </section>

      <TotalPayment
        paymentData={{
          orderPrice,
          totalPrice,
          totalDiscountPrice,
        }}
      />
    </main>
  );
}
