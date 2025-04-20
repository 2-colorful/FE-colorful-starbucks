import { redirect } from 'next/navigation';

import {
  getDetailDeliveryAddress,
  updateAddress,
} from '@/actions/address-service';
import UpdateAddressForm from '@/components/pages/address/UpdateAddressForm';
import { Heading } from '@/components/ui/common';

type AddressEditPageProps = {
  params: Promise<{ memberAddressUuid: string }>;
};

export default async function AddressEditPage({
  params,
}: AddressEditPageProps) {
  const { memberAddressUuid } = await params;
  const addressData = await getDetailDeliveryAddress(memberAddressUuid);

  const action = async (updateAddressData: FormData) => {
    'use server';
    const addressNickname = updateAddressData.get('addressNickname') as string;
    const receiverName = updateAddressData.get('receiverName') as string;
    const defaultAddress = updateAddressData.get('defaultAddress') as string;
    const zoneCode = updateAddressData.get('zoneCode') as string;
    const address = updateAddressData.get('address') as string;
    const detailAddress = updateAddressData.get('detailAddress') as string;
    const phoneNumber = updateAddressData.get('phoneNumber') as string;

    const data = {
      addressNickname,
      receiverName,
      defaultAddress: Boolean(defaultAddress),
      zoneCode,
      address,
      detailAddress,
      phoneNumber,
    };

    try {
      await updateAddress(memberAddressUuid, data);
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

      <UpdateAddressForm action={action} addressData={addressData} />
    </main>
  );
}
