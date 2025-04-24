import React from 'react';
import Image from 'next/image';

import { Avatar } from '@/components/ui/common/Avatar';
import logo from '../../../assets/images/logo.png';

export default function WelcomeSection() {
  return (
    <section className='w-full space-y-4 pt-15 pb-10 px-7 tracking-tighter'>
      <Avatar style={{ width: '5rem', height: '5rem' }}>
        <Image src={logo} alt='로고' fill style={{ objectFit: 'cover' }} />
      </Avatar>
      <h1 className='text-3xl font-bold'>
        고객님
        <br />
        환영합니다!
      </h1>
      <p className='text-md font-medium leading-normal text-[#717171]'></p>
    </section>
  );
}
