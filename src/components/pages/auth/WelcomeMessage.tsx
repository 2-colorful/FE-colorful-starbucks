import React from 'react';
import Image from 'next/image';

import img from '@/components/ui/logo.png';
import { Body, Title } from '@/components/ui/common';

export default function WelcomeMessage() {
  return (
    <section className='w-full py-10'>
      <Image
        src={img}
        alt='로고'
        unoptimized={true}
        className='size-[3.875rem] mb-[1.5rem]'
      />
      <Title level={2}>
        안녕하세요.
        <br />
        스타벅스입니다.
      </Title>
      <Body className='mt-3'> 회원 서비스 이용을 위해 로그인 해주세요.</Body>
    </section>
  );
}
