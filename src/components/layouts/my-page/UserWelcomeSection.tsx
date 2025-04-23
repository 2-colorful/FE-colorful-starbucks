import { UserInfoType } from '@/types/user';
import { ArrowRight } from 'lucide-react';

export default function UserWelcomeSection({
  myInfo,
}: {
  myInfo: UserInfoType;
}) {
  const levelColorClass = {
    WHITE: 'text-gray-500',
    GREEN: 'text-green-600',
    GOLD: 'text-amber-500',
    BLACK: 'text-slate-900',
  };

  return (
    <section className='bg-white p-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>{myInfo.nickName}님 환영합니다.</h2>
        <p className='text-base'>
          회원님의 등급은{' '}
          <span
            className={`font-semibold ${levelColorClass[myInfo.memberLevel]}`}
          >
            {myInfo.memberLevel}
          </span>
          입니다.
        </p>

        <div className='mt-2'>
          <button className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 hover:underline'>
            등급 혜택 보러가기
            <ArrowRight className='ml-1 w-4 h-4' />
          </button>
        </div>
      </div>
    </section>
  );
}
