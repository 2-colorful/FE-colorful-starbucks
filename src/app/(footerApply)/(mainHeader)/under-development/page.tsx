import Link from 'next/link';
import { Construction, Coffee, ArrowLeft } from 'lucide-react';

export default function UnderDevelopment() {
  return (
    <main className='w-full flex flex-col items-center justify-center flex-1 flex-grow min-h-[calc(100vh-120px)] px-4 pt-16 pb-20'>
      <div className='max-w-md w-full bg-white rounded-lg overflow-hidden text-center py-12 px-6'>
        <div className='mb-6'>
          <Construction className='h-24 w-24 text-primary-200 mx-auto' />
        </div>

        <h1 className='text-4xl font-bold text-text-900 mb-4'>준비 중입니다</h1>
        <div className='flex items-center justify-center mb-3'>
          <Coffee className='w-5 h-5 text-primary-200 mr-2' />
          <h2 className='text-xl font-semibold text-gray-800'>
            서비스 개발 중
          </h2>
        </div>

        <p className='text-gray-600 mb-8'>현재 이 페이지는 개발 중입니다.</p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            replace
            className='inline-flex items-center justify-center px-5 py-3 bg-primary-200 text-white rounded-full hover:bg-[#00513a] transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
