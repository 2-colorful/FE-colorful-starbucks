'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Modal } from '@/components/ui/common/Modal';
import { getDeliveryAddresses } from '@/actions/address-service';
import { AddressDataType } from '@/types/responseDataTypes';
import {
  BottomSheet,
  Button,
  RadioGroup,
  RadioGroupItem,
  SubTitle,
} from '@/components/ui/common';
import DeliveryItem from '@/components/ui/address/DeliveryItem';
import { useModalContext } from '@/context/ModalContext';
import Close from '@/assets/icons/common/close.svg';

export default function DeliveryAddressSelectionModal() {
  const { closeModal } = useModalContext();
  const searchParams = useSearchParams();
  const cartId = searchParams.getAll('cartId');
  const router = useRouter();
  const [addressList, setAddressList] = useState<AddressDataType[] | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const res = (await getDeliveryAddresses()).sort((a, b) => {
        if (a.isDefaultAddress) return -1;
        if (b) return 1;
        return 0;
      });

      if (res) {
        setAddressList(res);
      }
    })();
  }, [setAddressList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memberAddressUuid = formData.get('memberAddressUuid');

    const params = new URLSearchParams();
    params.append('cartId', cartId.join(','));
    if (memberAddressUuid !== null) {
      params.append('memberAddressUuid', memberAddressUuid.toString());
    }

    router.replace(`/payment?${params.toString()}`);
    closeModal();
  };

  if (addressList === null || (addressList && addressList?.length < 0)) return;

  return (
    <Modal variant='bottomSheet' className='py-6 max-h-10/12 h-full'>
      <div className='grid grid-cols-[1fr_auto] px-6 mb-6'>
        <SubTitle level={1}>배송지 선택</SubTitle>
        <button onClick={() => closeModal()}>
          <Close width={16} height={16} className='*:fill-text-900' />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='h-full max-h-[calc(100%-20px)]'>
        <RadioGroup
          name='memberAddressUuid'
          className='pb-32 h-full overflow-y-scroll scrollbar-hidden space-y-4'
        >
          {addressList?.map((address) => (
            <label
              key={address.memberAddressUuid}
              htmlFor={address.memberAddressUuid}
              className='grid grid-cols-[auto_1fr] gap-x-4 px-6'
            >
              <RadioGroupItem
                value={address.memberAddressUuid}
                id={address.memberAddressUuid}
              />
              <DeliveryItem data={address} />
            </label>
          ))}
        </RadioGroup>

        <BottomSheet className='absolute'>
          <Button type='submit' className='h-10 w-full'>
            변경하기
          </Button>
        </BottomSheet>
      </form>
    </Modal>
  );
}
