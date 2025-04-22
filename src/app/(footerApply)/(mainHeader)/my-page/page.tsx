import ShoppingInfoSection from '@/components/layouts/my-page/ShoppingInfoSection';
import UserWelcomeSection from '@/components/layouts/my-page/UserWelcomeSection';
import React from 'react';

export default function MyPage() {
  return (
    <main>
      <h1 className='sr-only'>마이페이지</h1>

      <UserWelcomeSection />

      <div className='mt-8'>
        <ShoppingInfoSection />
      </div>
    </main>
  );
}
