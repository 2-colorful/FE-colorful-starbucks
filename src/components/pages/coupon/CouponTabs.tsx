'use client';

interface CouponTabsProps {
  activeTab: 'possession' | 'receive';
  setActiveTab: (tab: 'possession' | 'receive') => void;
  possessionCount: number;
  receiveCount: number;
}

export default function CouponTabs({
  activeTab,
  setActiveTab,
  possessionCount,
  receiveCount,
}: CouponTabsProps) {
  return (
    <nav
      role='tablist'
      aria-label='쿠폰 탭'
      className='flex h-9 w-full mt-5 mb-10'
    >
      <button
        type='button'
        role='tab'
        id='tab-possession'
        aria-selected={activeTab === 'possession'}
        aria-controls='panel-possession'
        className={`flex h-full w-1/2 items-center justify-center border-b border-gray-300 transition-colors ${
          activeTab === 'possession'
            ? 'border-b-2 border-green-600 font-bold text-green-600'
            : 'text-gray-600'
        }`}
        onClick={() => setActiveTab('possession')}
      >
        보유쿠폰({possessionCount})
      </button>
      <button
        type='button'
        role='tab'
        id='tab-receive'
        aria-selected={activeTab === 'receive'}
        aria-controls='panel-receive'
        className={`flex h-full w-1/2 items-center justify-center border-b border-gray-300 transition-colors ${
          activeTab === 'receive'
            ? 'border-b-2 border-green-600 font-bold text-green-600'
            : 'text-gray-600'
        }`}
        onClick={() => setActiveTab('receive')}
      >
        쿠폰받기({receiveCount})
      </button>
    </nav>
  );
}
