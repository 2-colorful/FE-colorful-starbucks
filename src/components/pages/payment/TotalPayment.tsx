import { getProudctDetailData } from '@/actions/product-service';
import { Body, SubTitle } from '@/components/ui/common';
import { CartDetailType } from '@/types/responseDataTypes';

type TotalPaymentProps = {
  cartDatas: CartDetailType[];
  coupon?: { discountAmount: number }[];
};

export default async function TotalPayment({
  cartDatas,
  coupon,
}: TotalPaymentProps) {
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
    coupon?.reduce((acc, item) => {
      return acc + item.discountAmount;
    }, 0) || 0;

  const totalPrice = orderPrice - totalDiscountPrice;

  return (
    <section className='bg-gray-300 p-6'>
      <ul className='gap-y-2.5 grid'>
        <li>
          <Body className='flex w-full justify-between' level={3}>
            <span>주문 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </Body>
        </li>
        <li>
          <Body className='flex w-full justify-between' level={3}>
            <span>쿠폰 할인</span>
            <span>0원</span>
          </Body>
        </li>
      </ul>
      <SubTitle level={1} className='flex w-full justify-between mt-5'>
        <span>최종 결제 금액</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </SubTitle>
    </section>
  );
}
