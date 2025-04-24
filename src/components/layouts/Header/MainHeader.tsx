import Menu from './Menu';
import Logo from './Logo';
import UtilWrapper from './UtilWrapper';
import Cart from './Cart';
import Search from './Search';

export default function MainHeader() {
  return (
    <header className='fixed top-0 left-0 w-full max-w-3xl mx-auto right-0 flex justify-between items-center px-4 py-3 shadow-1 bg-white z-10'>
      <Menu />

      <Logo />

      <UtilWrapper>
        <Search />
        <Cart />
      </UtilWrapper>
    </header>
  );
}
