'use client';
import { useState } from 'react';

import AddressFields from '@/components/modules/address/AddressFields';
import { BottomSheet, Button } from '@/components/ui/common';
import TextField from '@/components/ui/common/TextField';
import { createAddressSchema } from '@/schema/address';

export interface CreateAddressState {
  receiverName: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}

export default function CreateAddressForm({
  action,
}: {
  action: (createAddressData: FormData) => Promise<void>;
  isDefaultAddress?: boolean;
}) {
  const [formData, setFormData] = useState<CreateAddressState>({
    receiverName: '',
    zoneCode: '',
    address: '',
    detailAddress: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldPartialSchema = { [name]: true } as {
      [K in keyof CreateAddressState]?: true;
    };

    const fieldSchema = createAddressSchema.pick(fieldPartialSchema);
    const result = fieldSchema.safeParse({ [name]: value });

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? '' : result.error.message,
    }));
  };

  const isFormValid = () => {
    const result = createAddressSchema.safeParse(formData);
    return result.success;
  };

  return (
    <form action={action} className='px-6 pb-5 space-y-5'>
      <TextField
        label='주소별칭'
        name='addressNickname'
        onChange={handleChange}
      />
      <TextField
        label='받는 분'
        required
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
        name='phoneNumber'
        onChange={handleChange}
        error={errors.phoneNumber}
      />

      <BottomSheet>
        <Button type='submit' className='w-full' disabled={!isFormValid()}>
          등록하기
        </Button>
      </BottomSheet>
    </form>
  );
}
