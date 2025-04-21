import Link from 'next/link';

import { Body } from '@/components/ui/common';

export default function CartDelivery() {
  return (
    <section className='p-6 bg-gray-50 flex justify-between items-start'>
      <Body level={3}>
        등록된 배송지가 없습니다.
        <br />
        배송지를 등록해주세요.
      </Body>
      <Link href={'/address/create'} className='text-primary-100 text-caption2'>
        배송지 등록
      </Link>
    </section>
  );
}
