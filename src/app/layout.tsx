import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

import './globals.css';
import { MenuProvider } from '@/context/MenuContext';
import Menu from '@/components/ui/common/Menu';
import ScrollToTopButton from '@/components/ui/common/ScrollToTopButton';
import { ModalProvider } from '@/context/ModalContext';
import AuthContextProvider from '@/provider/AuthContextProvider';
import { options } from './api/auth/[...nextauth]/options';
import MigrationHandler from '@/components/pages/common/MigrationHandler';
import { Providers } from '@/provider/Provider';
import RecentViewFloatingButton from '@/components/modules/recently-viewed/RecentViewFloatingButton';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SPHAROS 6TH Rebuilding APP',
    template: '%s | SPHAROS 6TH Rebuilding APP',
  },
  description: '1차프로젝트 SPHAROS 6TH Rebuilding',
  icons: { icon: '/assets/images/icons/icon.png' },
  metadataBase: new URL('https://colorful-starbucks.store'),
  openGraph: {
    url: 'https://colorful-starbucks.store',
    title: 'SPHAROS 6TH',
    description: '1차프로젝트 SPHAROS 6TH',
    images: [{ url: '/assets/images/og/og_image.png' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  const isAuth = !!session?.user as boolean;
  return (
    <html lang='ko-KR'>
      <body className={`${inter.className} antialiased bg-gray-100`}>
        <div className='min-w-xs max-w-3xl w-full mx-auto h-dvh bg-white relative overflow-x-hidden overflow-y-scroll scrollbar-hidden selection:bg-primary-100/20 selection:text-black'>
          <AuthContextProvider isAuth={isAuth}>
            <MenuProvider>
              <ModalProvider>
                <Menu />
                <Providers>
                  <MigrationHandler />
                  {children}
                </Providers>
                <RecentViewFloatingButton />
                <ScrollToTopButton />
              </ModalProvider>
            </MenuProvider>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
