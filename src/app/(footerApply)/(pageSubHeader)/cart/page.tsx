import CartForm from '@/components/pages/cart/CartForm';
import { getCartDatas } from '@/actions/cart-service';
import CartTerms from '@/components/modules/cart/CartTerms';
import CartDelivery from '@/components/pages/cart/CartDelivery';
import EmptyCart from '@/components/ui/cart/EmptyCart';
export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartDatas = await getCartDatas();

  const action = async (createOrderData: FormData) => {
    'use server';
    console.log('🚀 ~ action ~ cartsData:', createOrderData);
  };

  if (!cartDatas?.productDetails || cartDatas.productDetails.length === 0) {
    return (
      <main className='flex flex-col h-full min-h-dvh bg-white'>
        <CartDelivery />
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className='flex flex-col min-h-dvh bg-white'>
      <CartDelivery />

      <CartForm action={action} cartDatas={cartDatas} />

      <CartTerms />
    </main>
  );
}
