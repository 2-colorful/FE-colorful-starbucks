'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProductItem from '../../modules/main/ProductItem';
import SectionHeader from '../../modules/main/SectionHeader';
import { EventProductsType, EventResponseType } from '@/actions/event-service';
import { SimpleProduct } from '@/types/products/productTypes';

export default function ProductList({
  event,
  products,
}: {
  event: EventResponseType;
  products: (EventProductsType & { details: SimpleProduct })[];
}) {
  return (
    <section className='mx-auto p-4 mb-[50px]'>
      <SectionHeader title={event.title} eventUuid={event.eventUuid} />

      {products.length > 0 ? (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            220: { slidesPerView: 3 },
            450: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.productCode}>
              <ProductItem
                productCode={product.productCode}
                productDetails={product.details}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='text-center py-4'>해당 이벤트의 상품이 없습니다.</div>
      )}
    </section>
  );
}
