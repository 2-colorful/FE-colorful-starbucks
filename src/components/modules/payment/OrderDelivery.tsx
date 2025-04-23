import { Body, SubTitle, Tag } from '@/components/ui/common';
import OrderAddressChangeButton from '@/components/ui/payment/OrderAddressChangeButton';
import EmptyAddress from './EmptyAddress';
import type { AddressDataType } from '@/types/responseDataTypes';

export default async function OrderDelivery({
  addressData,
}: {
  addressData?: AddressDataType;
}) {
  if (!addressData) return <EmptyAddress />;

  return (
    <section className='mx-6 pb-5 space-y-2 border-b border-stroke-100'>
      <div className='grid grid-cols-[1fr_auto] '>
        <SubTitle>배송정보</SubTitle>
        <OrderAddressChangeButton />
      </div>
      <Body className='flex items-center gap-1 text-body2'>
        <span>
          {addressData.receiverName}
          {`(${addressData.addressNickname})`}
        </span>
        {addressData.isDefaultAddress && <Tag>기본</Tag>}
      </Body>
      <div className='space-y-0.5'>
        <Body level={3}>{`(${addressData.zoneCode})`}</Body>
        <Body level={3}>{addressData.address}</Body>
        <Body level={3}>{addressData.detailAddress}</Body>
      </div>
      <Body level={4} className='text-body4 text-text-500'>
        {addressData.phoneNumber}
      </Body>
    </section>
  );
}
