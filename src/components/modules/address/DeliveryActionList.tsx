'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ActionList } from '@/components/ui/common';
import { useModalContext } from '@/context/ModalContext';
import DeleteAddressModal from '@/components/ui/address/DeleteAddressModal';

export default function DeliveryActionList({
  memberAddressUuid,
  isDefaultAddress,
}: {
  memberAddressUuid: string;
  isDefaultAddress: boolean;
}) {
  const router = useRouter();
  const { openModal } = useModalContext();

  const handleClickDeleteButton = () => {
    openModal(<DeleteAddressModal memberAddressUuid={memberAddressUuid} />);
    router.replace(`/address?memberAddressUuid=${memberAddressUuid}`);
  };

  return (
    <ActionList.Group className='[&_li]:px-2'>
      <ActionList.Item>
        <Link href={`/address/edit/${memberAddressUuid}`}>수정</Link>
      </ActionList.Item>
      {!isDefaultAddress ? (
        <ActionList.Item>
          <button onClick={handleClickDeleteButton} className='cursor-pointer'>
            삭제
          </button>
        </ActionList.Item>
      ) : null}
    </ActionList.Group>
  );
}
