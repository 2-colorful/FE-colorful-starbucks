'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { checkAndMigrateLocalStorage } from '@/lib/recently-viewed/utils';

export default function MigrationHandler() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const needsMigration = sessionStorage.getItem('needsMigration');

      if (needsMigration === 'true') {
        setTimeout(() => {
          checkAndMigrateLocalStorage()
            .then((migrated) => {
              if (migrated) {
                console.log('최근 본 상품 데이터 백그라운드 이관 완료');
              }
              sessionStorage.removeItem('needsMigration');
            })
            .catch((error) => {
              console.error('백그라운드 데이터 이관 실패:', error);
              sessionStorage.removeItem('needsMigration');
            });
        }, 0);
      }
    }
  }, [status]);

  return null;
}
