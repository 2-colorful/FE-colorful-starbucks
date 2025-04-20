'use client';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

import TextField from '@/components/ui/common/TextField';
import { CreateAddressState } from '@/components/pages/address/CreateAddressForm';

interface AddressFieldsProps {
  formData: CreateAddressState;
  setFormData: React.Dispatch<React.SetStateAction<CreateAddressState>>;
  errors: Record<string, string>;
}

export default function AddressFields({
  formData,
  setFormData,
  errors,
}: AddressFieldsProps) {
  const scriptUrl =
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = async (data: Address) => {
    const requestData = { zoneCode: data.zonecode, address: data.address };
    setFormData((prev) => ({ ...prev, ...requestData }));
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <div className='grid grid-cols-[1fr_auto] justify-between items-end gap-4'>
        <TextField
          type='text'
          label='우편번호'
          required
          name='zoneCode'
          className='w-full'
          value={formData?.zoneCode ?? ''}
          readOnly
          error={errors.zoneCode}
        />
        <button
          type='button'
          onClick={handleClick}
          className='text-body2 border border-primary-100 rounded-full text-primary-100 px-4 py-2 cursor-pointer active:bg-gray-100 transition-colors duration-300 ease-in-out'
        >
          주소검색
        </button>
      </div>
      <TextField
        type='text'
        label='기본주소'
        required
        name='address'
        value={formData?.address ?? ''}
        readOnly
        error={errors.address}
      />
      <TextField
        label='상세주소'
        required
        name='detailAddress'
        value={formData.detailAddress}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
      />
    </>
  );
}
