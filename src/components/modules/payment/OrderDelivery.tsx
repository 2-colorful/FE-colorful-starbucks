import Link from 'next/link';

import { Body, Button, SubTitle, Tag } from '@/components/ui/common';
import {
  getDefaultDeliveryAddress,
  getDetailDeliveryAddress,
} from '@/actions/address-service';

export default async function OrderDelivery({
  memberAddressUuid,
}: {
  memberAddressUuid?: string;
}) {
  const addressData = memberAddressUuid
    ? await getDetailDeliveryAddress(memberAddressUuid)
    : await getDefaultDeliveryAddress();

  if (!addressData)
    return (
      <section className='px-6 pt-5'>
        <SubTitle>배송정보</SubTitle>
        <Body level={1} className='text-center pt-6'>
          등록된 배송지가 없습니다.
          <br /> 배송지를 등록해주세요.
        </Body>
        <div className='text-center py-6 border-b border-stroke-100'>
          <Button
            variant={'outline'}
            className='border-primary-100 text-primary-100 px-4 py-2 h-auto'
            asChild
          >
            <Link href='/address/create'>배송지 등록</Link>
          </Button>
        </div>
      </section>
    );

  return (
    <section className='mx-6 pb-5 space-y-2 border-b border-stroke-100'>
      <div className='grid grid-cols-[1fr_auto] '>
        <SubTitle>배송정보</SubTitle>
        <Button
          type='button'
          variant={'outline'}
          className='px-3 py-1 text-caption2 h-7 active:bg-gray-100'
        >
          변경
        </Button>
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
