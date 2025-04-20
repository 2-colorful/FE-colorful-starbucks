import { Caveat } from 'next/font/google';

import { ProductTypes } from '@/types/products/productTypes';
import ProductAccordion from './ProductAccordion';
import ShareIcon from '@/assets/icons/common/share.svg';
import ProductTags from '@/components/modules/product/ProductTags';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

interface ProductInfoProps extends ProductTypes {
  tags?: {
    isBest: boolean;
    isNew: boolean;
    isMarkable: boolean;
  };
}

export default function ProductInfo({ ...product }: ProductInfoProps) {
  const handleshareProduct = (productCode: number) => {
    console.log('shared' + productCode);
  };

  return (
    <section className='px-4 py-5'>
      <div className='flex justify-between items-center j mb-2'>
        <h2 className='text-title1 font-bold'>
          {product.productName}
          <ProductTags isMarkable={product.markable} caveatFont={caveat} />
        </h2>
        <button
          className='cursor-pointer'
          onClick={() => handleshareProduct(product.productCode)}
        >
          <ShareIcon />
        </button>
      </div>

      <div className='flex items-center mb-3'></div>
      <p className='text-sm text-gray-500 mb-5'>{product.description}</p>
      <p className='text-2xl font-bold mb-8'>
        {product.price ? product.price.toLocaleString() : '가격 정보 없음'}원
      </p>
      <ProductAccordion title='상품정보' content={product.description} />
    </section>
  );
}
