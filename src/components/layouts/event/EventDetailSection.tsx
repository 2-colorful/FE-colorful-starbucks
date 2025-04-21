import { DetailEventResponseType } from '@/actions/event-service';
import Image from 'next/image';
import React from 'react';

export default function EventDetailSection({
  eventDetail,
}: {
  eventDetail: DetailEventResponseType;
}) {
  return (
    <section className='h-screen overflow-y-auto'>
      <div className='relative w-full'>
        <Image
          src={eventDetail.imageUrl}
          alt={eventDetail.title + eventDetail.description}
          width={370}
          height={1500}
          unoptimized={true}
          className='w-full h-auto'
        />
      </div>
      {/* TODO: 이벤트 상품 리스트 뿌려줄 섹션 */}
    </section>
  );
}
