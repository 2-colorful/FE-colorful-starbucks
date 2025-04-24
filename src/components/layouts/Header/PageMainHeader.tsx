import Prev from './Prev';
import Logo from './Logo';
import UtilWrapper from './UtilWrapper';
import Search from './Search';
import Cart from './Cart';

export default function PageMainHeader() {
  return (
    <header className='fixed top-0 left-0 w-full max-w-3xl mx-auto right-0 flex justify-between items-center px-4 py-3 shadow-1 bg-white z-10'>
      <Prev />

      <Logo />

      <UtilWrapper>
        <Search />
        <Cart />
      </UtilWrapper>
    </header>
  );
}
