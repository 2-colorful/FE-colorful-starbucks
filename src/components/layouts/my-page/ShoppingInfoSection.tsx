'use client';
import ShoppingInfoItem from '@/components/pages/my-page/ShoppingInfoItem';
import {
  FileText,
  Gift,
  Ticket,
  Truck,
  LogOut,
  ShoppingBag,
} from 'lucide-react';

export default function ShoppingInfoSection() {
  return (
    <section className='bg-gray-300 p-6 mt-8'>
      <h2 className='text-xl font-bold mb-6'>내정보</h2>

      <div className='space-y-6'>
        <ShoppingInfoItem
          icon={<ShoppingBag className='w-6 h-6 text-gray-600' />}
          title='주문내역'
          href='/my-page/orders'
        />

        <ShoppingInfoItem
          icon={<FileText className='w-6 h-6 text-gray-600' />}
          title='내정보 수정'
          href='/my-page/edit-profile'
        />

        <ShoppingInfoItem
          icon={<Gift className='w-6 h-6 text-gray-600' />}
          title='찜한상품'
          href='/my-page/wishlist'
        />

        <ShoppingInfoItem
          icon={<Ticket className='w-6 h-6 text-gray-600' />}
          title='쿠폰'
          href='/my-page/coupons'
        />

        <ShoppingInfoItem
          icon={<Truck className='w-6 h-6 text-gray-600' />}
          title='배송지 관리'
          href='/address'
        />

        <ShoppingInfoItem
          icon={<LogOut className='w-6 h-6 text-gray-600' />}
          title='로그아웃'
          href='/logout'
          onClick={(e) => {
            e.preventDefault();
            // 로그아웃 로직은 추후 구현
            console.log('로그아웃');
          }}
        />
      </div>
    </section>
  );
}
