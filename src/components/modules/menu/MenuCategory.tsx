'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { mainCategoryDatas } from '@/data/main/initData';
import { useMenuContext } from '@/context/MenuContext';
import { Body } from '@/components/ui/common';
import MoreButton from '@/components/ui/main/MoreButton';

export default function MenuNav() {
  const router = useRouter();
  const { setIsOpen } = useMenuContext();

  const handleRouteChange = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <nav className='px-6 py-8 grow space-y-4 lg:space-y-6'>
      <div className='grid justify-end text-text-900 hover:text-black focus:text-black transition-colors'>
        <button onClick={() => setIsOpen(false)}>
          <MoreButton href='/products' title='전체 상품 보기' />
        </button>
      </div>

      <ul className='grid grid-cols-3 md:grid-cols-4 justify-items-center items-start sm:items-center gap-x-2 gap-y-5'>
        {mainCategoryDatas.map(({ id, title, icon }) => (
          <li key={id} className='inline-block w-full max-w-[100px]'>
            <button
              onClick={() => handleRouteChange(`/products?topCategoryId=${id}`)}
              className='space-y-2.5 cursor-pointer w-full'
            >
              <div className='w-full aspect-square relative'>
                <Image
                  src={icon}
                  alt={`${title} 카테고리 썸네일 이미지`}
                  sizes='100%'
                  fill
                  className='rounded-full object-cover'
                />
              </div>
              <Body level={3} className='text-center'>
                {title}
              </Body>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
