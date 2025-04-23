import Image from 'next/image';

import {
  getProductDetail,
  getProductOptionData,
  getProudctDetailData,
} from '@/actions/product-service';
import { Body, Caption } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';

type OrderDetailCardProps = {
  cartId: number;
  quantity: number;
  productCode: number;
  productDetailCode: number;
  carvingContent: string | null;
};

export default async function OrderDetailCard({
  cartId,
  quantity,
  productCode,
  productDetailCode,
  carvingContent,
}: OrderDetailCardProps) {
  const [product, productDetail, options] = await Promise.all([
    getProductDetail(productCode),
    getProudctDetailData(productDetailCode),
    getProductOptionData(productCode),
  ]);

  if (!product || !productDetail || !options) return;

  const currentOption = {
    quantity,
    colorName: productDetail.colorName,
    sizeName: productDetail.sizeName,
    carvingContent,
  };
  const currentOptionList = Object.entries(currentOption)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => ({
      key,
      value: key === 'quantity' ? `${value}개` : value,
    }));

  return (
    <li key={cartId} className='flex gap-3 items-start w-full pb-4'>
      <Image
        src={product.productThumbnailUrl}
        alt={product.productName}
        unoptimized={true}
        width={50}
        height={50}
        priority
        className='rounded-xl'
      />

      <div className='flex flex-col flex-grow space-y-3'>
        <Caption
          level={1}
          className='!font-medium w-full line-clamp-2 text-text-900 text-wrap'
        >
          {product.productName}
        </Caption>
        <Caption className='text-text-900 line-clamp-2 bg-gray-400 px-2 py-1 rounded-sm w-fit gap-2 [display:-webkit-box] [overflow:hidden] [text-overflow:ellipsis] [WebkitLineClamp:2] [WebkitBoxOrient:vertical]'>
          {currentOptionList.map(({ key, value }, index) => (
            <span key={key}>
              {value}
              {index < currentOptionList.length - 1 && (
                <span className='px-1'>/</span>
              )}
            </span>
          ))}
        </Caption>
        <Body>{priceFormatter(productDetail.price * quantity)}원</Body>
      </div>
    </li>
  );
}
