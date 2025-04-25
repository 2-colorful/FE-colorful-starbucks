'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  ANONYMOUS,
  loadTossPayments,
  TossPaymentsSDK,
} from '@tosspayments/tosspayments-sdk';

import { createPreOrder } from '@/actions/payment-service';
import { BottomSheet, Button } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';
import { OrderDetailType, PreOrderRequestType } from '@/types/requestDataTypes';
import { AddressDataType } from '@/types/responseDataTypes';
import { PAYMENT_CLIENT_KEY } from '@/data/initialDatas';
import { useModalContext } from '@/context/ModalContext';
import AlertEmptyAddressData from '@/components/ui/payment/AlertEmptyAddressData';

type PayMentRequestButtonProps = {
  totalPrice: number;
  addressData?: AddressDataType;
  totalDiscountPrice: number;
  orderDetails: OrderDetailType[];
};

export default function PaymentRequestButton({
  totalPrice,
  addressData,
  totalDiscountPrice,
  orderDetails,
}: PayMentRequestButtonProps) {
  const [payments, setPayments] = useState<TossPaymentsSDK | null>(null);
  const { openModal } = useModalContext();

  useEffect(() => {
    (async () => {
      if (!PAYMENT_CLIENT_KEY) return;
      const tossPayments = await loadTossPayments(PAYMENT_CLIENT_KEY);

      setPayments(tossPayments);
    })();
  }, []);

  const params = useSearchParams();

  const memberAddressUuid = params.get('memberAddressUuid');
  const couponUuid = params.get('couponUuid');

  const handleClickPayment = async () => {
    if (!addressData) return openModal(<AlertEmptyAddressData />);

    try {
      const preOrderData: PreOrderRequestType = {
        ...(couponUuid ? { couponUuid } : null),
        totalAmount: totalPrice,
        discountAmount: totalDiscountPrice,
        memberAddressUuid: memberAddressUuid
          ? memberAddressUuid
          : addressData.memberAddressUuid,
        receiverName: addressData?.receiverName,
        orderDetails,
      };
      const res = await createPreOrder(preOrderData);

      const orderName =
        orderDetails.length > 1
          ? `${orderDetails[0].productName} 외 ${orderDetails.length - 1}건`
          : orderDetails[0].productName;

      await payments?.payment({ customerKey: ANONYMOUS }).requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: res.totalAmount,
        },
        orderId: res.orderCode.toString(),
        orderName,
        successUrl:
          window.location.origin + '/payment/success' + window.location.search,
        failUrl:
          window.location.origin + '/payment/fail' + window.location.search,
        customerName: addressData.receiverName,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className='wrapper w-100'>
        <div className='max-w-540 w-100'>
          <div id='payment-method' className='w-100' />
          <div id='agreement' className='w-100' />
        </div>
      </div>
      <BottomSheet>
        <Button type='button' className='w-full' onClick={handleClickPayment}>
          {priceFormatter(totalPrice)}원 결제하기
        </Button>
        {/* <CheckoutPage /> */}
      </BottomSheet>
    </>
  );
}
