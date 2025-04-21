import Image from 'next/image';

import Tag from '../../ui/main/Tag';

type ProductDataType = {
  productCode: string;
  productName: string;
  price: number;
  productThumbnailUrl: string;
};

export default function ProductItem({ product }: { product: ProductDataType }) {
  const { productName, price, productThumbnailUrl } = product;
  return (
    <div className='w-full'>
      <div className='relative aspect-square w-full'>
        <Image
          src={productThumbnailUrl}
          alt={productName}
          unoptimized={true}
          className='rounded-[4px]'
          fill
          sizes='100%'
        />
      </div>
      <Tag isMarkable={true} isNew={false} isBest={true} />
      <h3 className='text-button2 my-3 '>{productName}</h3>
      <p className='text-subtitle2'>{price.toLocaleString()}원</p>
    </div>
  );
}
