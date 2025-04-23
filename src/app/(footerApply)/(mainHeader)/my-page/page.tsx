import React from 'react';

import { getUserInfo } from '@/actions/user-service';
import ShoppingInfoSection from '@/components/layouts/my-page/ShoppingInfoSection';
import UserWelcomeSection from '@/components/layouts/my-page/UserWelcomeSection';
export const dynamic = 'force-dynamic';

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
