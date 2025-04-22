import { getUserInfo } from '@/actions/user-service';
import ShoppingInfoSection from '@/components/layouts/my-page/ShoppingInfoSection';
import UserWelcomeSection from '@/components/layouts/my-page/UserWelcomeSection';
import React from 'react';

export default async function MyPage() {
  const myInfo = await getUserInfo();

  return (
    <main>
      <h1 className='sr-only'>마이페이지</h1>
      <UserWelcomeSection myInfo={myInfo} />

      <ShoppingInfoSection />
    </main>
  );
}
