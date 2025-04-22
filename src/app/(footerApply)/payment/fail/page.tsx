import Link from 'next/link';

import { Body, Button, Title } from '@/components/ui/common';
import Fail from '@/assets/icons/common/fail.svg';

interface PaymentFailPageProps {
  searchParams: Promise<SearchParamsType>;
}

type SearchParamsType = {
  message: string;
};

export default async function PaymentFailPage({
  searchParams,
}: PaymentFailPageProps) {
  const { message } = await searchParams;

  return (
    <main>
      <section className='mx-6 pt-12 pb-6 text-center space-y-4 border-b border-stroke-100'>
        <Fail className='mx-auto' />
        <Title className='line-clamp-2'>결제에 실패했습니다.</Title>
        <Body level={3} className='text-text-900'>
          {message}
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
            <Link href={'/cart'}>장바구니 가기</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
