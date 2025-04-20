import { redirect } from 'next/navigation';

import { createDeliveryAddress } from '@/actions/address-service';
import CreateAddressForm from '@/components/pages/address/CreateAddressForm';
import { Heading } from '@/components/ui/common';

export default async function AddressCreatePage() {
  const action = async (createAddressData: FormData) => {
    'use server';
    const addressNickname = createAddressData.get('addressNickname') as string;
    const receiverName = createAddressData.get('receiverName') as string;
    const zoneCode = createAddressData.get('zoneCode') as string;
    const address = createAddressData.get('address') as string;
    const detailAddress = createAddressData.get('detailAddress') as string;
    const phoneNumber = createAddressData.get('phoneNumber') as string;

    const addressData = {
      addressNickname,
      receiverName,
      zoneCode,
      address,
      detailAddress,
      phoneNumber,
    };
    try {
      await createDeliveryAddress(addressData);

      redirect('/address');
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <Heading.Wrapper>
        <Heading.Title>배송지 정보</Heading.Title>
      </Heading.Wrapper>

      <CreateAddressForm action={action} />
    </main>
  );
}
