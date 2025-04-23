'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { checkAndMigrateLocalStorage } from '@/lib/recently-viewed/utils';
import { migrateGuestSearchesToDB } from '@/lib/search/util';

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

              const needsSearchMigration = sessionStorage.getItem(
                'needsSearchMigration',
              );
              if (needsSearchMigration === 'true') {
                migrateGuestSearchesToDB()
                  .then((searchMigrated) => {
                    if (searchMigrated) {
                      console.log('최근 검색어 데이터 백그라운드 이관 완료');
                    }
                    sessionStorage.removeItem('needsSearchMigration');
                  })
                  .catch((error) => {
                    console.error(
                      '최근 검색어 데이터 백그라운드 이관 실패:',
                      error,
                    );
                    sessionStorage.removeItem('needsSearchMigration');
                  });
              }

              sessionStorage.removeItem('needsMigration');
            })
            .catch((error) => {
              console.error('최근 본 상품 백그라운드 데이터 이관 실패:', error);
              sessionStorage.removeItem('needsMigration');
              sessionStorage.removeItem('needsSearchMigration');
            });
        }, 0);
      }
    }
  }, [status]);

  return null;
}
