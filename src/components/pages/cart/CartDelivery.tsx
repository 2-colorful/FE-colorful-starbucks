import Link from 'next/link';

import { Body, Tag } from '@/components/ui/common';
import { getDefaultDeliveryAddress } from '@/actions/address-service';

export default async function CartDelivery() {
  const addressData = await getDefaultDeliveryAddress();

  if (!addressData)
    return (
      <section className='p-6 bg-gray-50 flex justify-between items-start'>
        <Body level={3}>
          등록된 배송지가 없습니다.
          <br />
          배송지를 등록해주세요.
        </Body>
        <Link
          href={'/address/create'}
          className='text-primary-100 text-caption2'
        >
          배송지 등록
        </Link>
      </section>
    );

  return (
    <section className='p-6 bg-gray-50 space-y-2.5 items-start'>
      <Body className='flex items-center gap-1'>
        <span>
          {addressData.receiverName}
          {`(${addressData.addressNickname})`}
        </span>
        {addressData.isDefaultAddress && <Tag>기본</Tag>}
      </Body>
      <Body level={3} className='line-clamp-2'>
        {`(${addressData.zoneCode})`} {addressData.address}{' '}
        {addressData.detailAddress}
      </Body>
    </section>
  );
}
