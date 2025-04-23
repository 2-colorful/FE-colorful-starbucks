import { Caption, Heading } from '@/components/ui/common';
import { Accordion } from '@/components/ui/common/accordion';
import OrderInfo from '@/components/modules/payment/OrderInfo';
import CouponInfo from '@/components/modules/payment/CouponInfo';
import TotalPayment from '@/components/pages/payment/TotalPayment';
import { getCartDetail } from '@/actions/cart-service';
import OrderDelivery from '@/components/modules/payment/OrderDelivery';
import {
  getDefaultDeliveryAddress,
  getDetailDeliveryAddress,
} from '@/actions/address-service';
import { getCouponDetail } from '@/actions/coupon-service';
import {
  getProductDetail,
  getProudctDetailData,
} from '@/actions/product-service';
import { calculateDiscount } from '@/lib/calculateDiscount';
import { OrderDetailType } from '@/types/requestDataTypes';
import PaymentRequestButton from '@/components/modules/payment/PaymentRequestButton';

type SearchParamType = {
  cartId: string;
  memberAddressUuid?: string;
  couponUuid?: string;
};

type PaymentPageProps = {
  searchParams: Promise<SearchParamType>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;

  const cartIds =
    params.cartId.split(',').map((id) => ({ cartId: Number(id) })) ||
    ([] as { cartId: number }[]);

  const cartDatas = await Promise.all(
    cartIds.map(async ({ cartId }) => {
      const data = await getCartDetail(cartId);

      return { ...data, cartId };
    }),
  );

  const couponData = await getCouponDetail(params.couponUuid);

  const addressData = params.memberAddressUuid
    ? await getDetailDeliveryAddress(params.memberAddressUuid)
    : await getDefaultDeliveryAddress();

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

  return (
    <main>
      <Heading.Wrapper>
        <Heading.Title>결제하기</Heading.Title>
      </Heading.Wrapper>

      <OrderDelivery addressData={addressData} />

      <section className='px-6 data-[slot=accordion-item]:border-none'>
        <Accordion type='multiple' defaultValue={['coupon']}>
          <OrderInfo cartDatas={cartDatas} />
          <CouponInfo couponData={couponData} orderPrice={orderPrice} />

          <PaymentRequestButton
            addressData={addressData}
            orderDetails={orderDetails}
            totalDiscountPrice={Number(totalDiscountPrice)}
            totalPrice={Number(totalPrice)}
          />
        </Accordion>
      </section>

      <TotalPayment
        paymentData={{
          orderPrice,
          totalPrice,
          totalDiscountPrice,
        }}
      />

      <section className='pt-6 px-6 pb-20'>
        <Caption className='p-4 bg-gray-200 text-text-500'>
          위 주문 내용을 확인하였으며, 결제에 동의합니다.
          <br />
          (전자상거래법 8조 2항)
        </Caption>
      </section>
    </main>
  );
}
