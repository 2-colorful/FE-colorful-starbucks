import Link from 'next/link';

import { BottomSheet, Button, Caption, Heading } from '@/components/ui/common';
import IconPlus from '@/assets/icons/address/plusIcon.svg';
import DeliveryAddressList from '@/components/modules/address/DeliveryAddressList';
import { getDeliveryAddresses } from '@/actions/address-service';
import { cn } from '@/lib/utils';
export const dynamic = 'force-dynamic';

export default async function AddressPage() {
  const deliveryAddressDatas = (await getDeliveryAddresses())?.sort((a, b) => {
    if (a.isDefaultAddress) return -1;
    if (b.isDefaultAddress) return 1;
    return 0;
  });

  return (
    <main>
      <Heading.Wrapper className='flex-col items-start gap-y-2.5'>
        <Heading.Title>배송지 관리</Heading.Title>
        <Caption level={1} className='text-text-500'>
          배송지는 최대 5개까지 등록 가능합니다.
        </Caption>
      </Heading.Wrapper>

      <DeliveryAddressList deliveryAddressDatas={deliveryAddressDatas} />

      <BottomSheet>
        <Button
          variant={'default'}
          disabled={deliveryAddressDatas.length >= 5}
          width={'auto'}
          className={cn(
            'w-full',
            deliveryAddressDatas.length >= 5 ? 'pointer-events-none' : '',
          )}
          asChild
        >
          <Link href={'/address/create'}>
            <IconPlus width={12} height={12} /> 새 배송지 추가
          </Link>
        </Button>
      </BottomSheet>
    </main>
  );
}
