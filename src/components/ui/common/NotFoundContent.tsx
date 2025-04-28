import Link from 'next/link';
import { Coffee, ArrowLeft } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <main className='w-full flex flex-col items-center justify-center flex-1 flex-grow min-h-[calc(100vh-120px)] px-4 pt-16 pb-20'>
      <div className='max-w-md w-full bg-white rounded-lg overflow-hidden text-center py-12 px-6'>
        <div className='mb-6'>
          <Coffee className='h-24 w-24 text-primary-200 mx-auto' />
        </div>

        <h1 className='text-7xl font-bold text-text-900 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
          페이지를 찾을 수 없습니다
        </h2>

        <p className='text-gray-600 mb-8'>
          찾으시는 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>

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
