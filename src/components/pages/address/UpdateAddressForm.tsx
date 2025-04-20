'use client';
import { useCallback, useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';

import { AddressDataType } from '@/types/responseDataTypes';
import { updateAddressSchema } from '@/schema/address';
import TextField from '@/components/ui/common/TextField';
import AddressFields from '@/components/modules/address/AddressFields';
import { BottomSheet, Button } from '@/components/ui/common';
import { Checkbox } from '@/components/ui/common/checkbox';

type UpdateAddressFormProps = {
  action: (updateAddressData: FormData) => Promise<void>;
  addressData?: AddressDataType;
};

type UpdateAddressState = {
  addressNickname?: string;
  receiverName: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
};

export default function UpdateAddressForm({
  action,
  addressData,
}: UpdateAddressFormProps) {
  const [formData, setFormData] = useState<UpdateAddressState>({
    addressNickname: addressData?.addressNickname ?? '',
    receiverName: addressData?.receiverName ?? '',
    zoneCode: addressData?.zoneCode ?? '',
    address: addressData?.address ?? '',
    detailAddress: addressData?.detailAddress ?? '',
    phoneNumber: addressData?.phoneNumber ?? '',
  });

  const [defaultAddress, setDefaultAddress] = useState<CheckedState>(
    addressData?.isDefaultAddress ?? false,
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldPartialSchema = { [name]: true } as {
      [K in keyof UpdateAddressState]?: true;
    };

    const fieldSchema = updateAddressSchema.pick(fieldPartialSchema);
    const result = fieldSchema.safeParse({ [name]: value });

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? '' : result.error.errors[0].message,
    }));
  };

  const isFormValid = useCallback(() => {
    if (!addressData) return;

    const {
      isDefaultAddress: _isDefaultAddress,
      memberAddressUuid: _memberAddressUuid,
      ...initAddressData
    } = addressData;

    const hasChanges = Object.keys(formData).some(
      (key) =>
        formData[key as keyof UpdateAddressState] !==
        initAddressData[key as keyof typeof initAddressData],
    );

    if (!hasChanges && addressData.isDefaultAddress === defaultAddress)
      return false;

    const result = updateAddressSchema.safeParse(formData);
    return result.success;
  }, [formData, addressData, defaultAddress]);

  if (!addressData) return;

  return (
    <form action={action} className='px-6 pb-5 space-y-5'>
      <TextField
        label='주소별칭'
        name='addressNickname'
        defaultValue={addressData.addressNickname}
        onChange={handleChange}
      />
      <TextField
        label='받는 분'
        required
        defaultValue={addressData.receiverName}
        name='receiverName'
        onChange={handleChange}
        error={errors.receiverName}
      />

      <AddressFields
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <TextField
        label='연락처'
        required
        type='tel'
        defaultValue={addressData.phoneNumber}
        name='phoneNumber'
        onChange={handleChange}
        error={errors.phoneNumber}
      />

      {!addressData.isDefaultAddress ? (
        <label className='text-text-900 text-body3 flex gap-2.5 items-center'>
          <Checkbox
            name='defaultAddress'
            checked={defaultAddress}
            onCheckedChange={(checked) => setDefaultAddress(checked)}
          />
          기본배송지로 저장합니다.
        </label>
      ) : null}

      <BottomSheet>
        <Button type='submit' className='w-full' disabled={!isFormValid()}>
          수정하기
        </Button>
      </BottomSheet>
    </form>
  );
}
