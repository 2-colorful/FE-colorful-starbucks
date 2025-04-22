import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import { DetailEventResponseType } from '@/actions/event-service';

export default function EventDetailSection({
  eventDetail,
}: {
  eventDetail: DetailEventResponseType;
}) {
  if (!eventDetail) return;
  const EventDetailHtml = dynamic(() => import('./EventDetailHtml'));
  return (
    <section className='h-screen overflow-y-auto'>
      <div className='relative w-full'>
        <Image
          src={eventDetail.thumbnailUrl}
          alt={eventDetail.title + eventDetail.description}
          width={370}
          height={1500}
          unoptimized={true}
          className='w-full h-auto'
        />
        <EventDetailHtml html={eventDetail.imageUrl} />
      </div>
    </section>
  );
}
