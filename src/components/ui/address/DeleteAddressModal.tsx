'use client';

import { Body } from '@/components/ui/common';
import { Modal } from '@/components/ui/common/Modal';
import { ModalButtons } from '../common/Modal/ModalButtons';
import { deleteAddress } from '@/actions/address-service';
import { useModalContext } from '@/context/ModalContext';

interface DeleteAddressModalProps {
  memberAddressUuid: string;
}

export default function DeleteAddressModal({
  memberAddressUuid,
}: DeleteAddressModalProps) {
  const { closeModal } = useModalContext();

  const handleClickReset = () => {
    closeModal();
  };

  const handleDeleteAddressData = async (memberAddressUuid: string) => {
    try {
      await deleteAddress(memberAddressUuid);

      closeModal();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal variant='card' className='overflow-hidden'>
      <Body level={3} className='px-6 pt-10 pb-6 text-text-700'>
        배송지를 삭제하시겠어요?
      </Body>

      <ModalButtons.Wrapper>
        <ModalButtons.Button
          onClick={handleClickReset}
          className='text-text-700'
        >
          취소
        </ModalButtons.Button>
        <ModalButtons.Button
          onClick={() => handleDeleteAddressData(memberAddressUuid)}
          className='text-primary-100'
        >
          삭제
        </ModalButtons.Button>
      </ModalButtons.Wrapper>
    </Modal>
  );
}
