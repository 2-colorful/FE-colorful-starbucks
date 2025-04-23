import Link from 'next/link';

import { Body, Button, SubTitle } from '@/components/ui/common';

export default function EmptyAddress() {
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
}
