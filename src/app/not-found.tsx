import MainHeader from '@/components/layouts/Header/MainHeader';
import Nav from '@/components/layouts/Nav';
import NotFoundContent from '@/components/ui/common/NotFoundContent';
import React from 'react';

export default function NotFound() {
  return (
    <>
      <MainHeader />
      <NotFoundContent />
      <Nav />
    </>
  );
}
