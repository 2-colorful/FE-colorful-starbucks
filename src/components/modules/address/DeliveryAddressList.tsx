import DeliveryItem from '@/components/ui/address/DeliveryItem';
import DeliveryActionList from './DeliveryActionList';
import { AddressDataType } from '@/types/responseDataTypes';

type DeliveryAddressListProps = {
  deliveryAddressDatas: AddressDataType[];
};

export default async function DeliveryAddressList({
  deliveryAddressDatas,
}: DeliveryAddressListProps) {
  if (!deliveryAddressDatas || deliveryAddressDatas.length === 0) return;

  return (
    <ul className='px-6 [&_li]:last:border-none pb-28'>
      {deliveryAddressDatas.map((address, index) => (
        <li
          key={index}
          className='border-b border-b-stroke-100 py-5 flex justify-between items-start'
        >
          <DeliveryItem data={address} />
          <DeliveryActionList
            memberAddressUuid={address.memberAddressUuid}
            isDefaultAddress={address.isDefaultAddress}
          />
        </li>
      ))}
    </ul>
  );
}
