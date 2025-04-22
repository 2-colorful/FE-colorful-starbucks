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
            <div className='relative h-[300px] md:h-[350px] lg:h-[400px]'>
              <Image
                src={event.thumbnailUrl || '/placeholder.svg'}
                alt={`Banner ${event.eventUuid}`}
                fill
                unoptimized={true}
                style={{ objectFit: 'cover' }}
                priority
              />

              <div className='absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10 pointer-events-none'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4'>
                  {event.title}
                </h2>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainBanner;
