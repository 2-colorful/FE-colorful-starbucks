import { Modal } from '../common/Modal';
import { Body } from '../common';
import { ModalButtons } from '../common/Modal/ModalButtons';
import { useModalContext } from '@/context/ModalContext';

export default function AlertEmptyAddressData() {
  const { closeModal } = useModalContext();
  return (
    <Modal className='overflow-hidden'>
      <Body level={1} className='px-6 pt-12 pb-10 text-center text-text-900'>
        선택된 배송지가 없습니다.
        <br />
        배송지를 등록해주세요.
      </Body>
      <ModalButtons.Wrapper>
        <ModalButtons.Button onClick={() => closeModal()}>
          확인
        </ModalButtons.Button>
      </ModalButtons.Wrapper>
    </Modal>
  );
}
