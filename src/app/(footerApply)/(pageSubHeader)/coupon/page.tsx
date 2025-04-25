'use client';
import { useState } from 'react';

import CouponPossessionPanel from '@/components/pages/coupon/CouponPossessionPanel';
import CouponReceivePanel from '@/components/pages/coupon/CouponReceivePanel';
import CouponTabs from '@/components/pages/coupon/CouponTabs';

export default function CouponPage() {
  const [activeTab, setActiveTab] = useState<'possession' | 'receive'>(
    'receive',
  );

  return (
    <main className='max-w-screen-md mx-auto space-y-5 pb-24'>
      <CouponTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        possessionCount={0}
        receiveCount={1}
      />

      <CouponPossessionPanel isActive={activeTab === 'possession'} />

      <CouponReceivePanel isActive={activeTab === 'receive'} />
    </main>
  );
}
