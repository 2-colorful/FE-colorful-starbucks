import MainHeader from '@/components/layouts/Header/MainHeader';
import Nav from '@/components/layouts/Nav';

export default function MainHeaderLayout({
  children,
}: {
  children?: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <MainHeader />
      <main className='pt-14'>{children}</main>
      <Nav />
    </>
  );
}
