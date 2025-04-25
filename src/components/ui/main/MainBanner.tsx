'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

import { EventResponseType } from '@/actions/event-service';

function MainBanner({ events }: { events: EventResponseType[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {events.map((event) => (
        <SwiperSlide key={event.eventUuid}>
          <Link href={`/events?eventId=${event.eventUuid}`} className='block'>
            <div className='relative h-[400px] md:h-[450px] lg:h-[500px]'>
              <Image
                src={event.thumbnailUrl || '/placeholder.svg'}
                alt={`Banner ${event.eventUuid}`}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className='absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10 pointer-events-none'></div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainBanner;
