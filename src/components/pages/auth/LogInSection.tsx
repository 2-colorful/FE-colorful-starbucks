'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

import LogInForm from './LogInInForm';
import { BottomSheet, Button } from '@/components/ui/common';

export default function LogInSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');

      const hasRecentItems =
        localStorage.getItem('recentlyViewedItems') !== null;

      if (hasRecentItems) {
        sessionStorage.setItem('needsMigration', 'true');
      }

      await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('로그인 처리 중 오류:', error);
      setIsLoading(false);
    }
  };

  return (
    <form className='h-full' onSubmit={handleSubmit}>
      <LogInForm />
      <BottomSheet>
        <Button type='submit' className='w-full h-10' disabled={isLoading}>
          {isLoading ? '처리 중...' : '로그인'}
        </Button>
      </BottomSheet>
    </form>
  );
}
