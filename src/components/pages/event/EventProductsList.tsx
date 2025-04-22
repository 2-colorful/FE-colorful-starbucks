import React from 'react';

import { getEventProducts } from '@/actions/event-service';
import EventProductItem from '@/components/modules/event/EventProductItem';

export default async function EventProductsList({
  eventUuid,
}: {
  eventUuid: string;
}) {
  const eventProducts = await getEventProducts(eventUuid);

  return (
    <section className='padded mt-4 ml-4 mr-4 flex justify-center flex-col'>
      <ul className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {eventProducts.map((eventProduct) => (
          <li key={eventProduct.productCode}>
            <EventProductItem productCode={eventProduct.productCode} />
          </li>
        ))}
      </ul>
    </section>
  );
}
