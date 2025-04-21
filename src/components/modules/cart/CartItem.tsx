import Link from 'next/link';
import Image from 'next/image';

import type { CartItemDataType } from '@/types/responseDataTypes';
import {
  getProductDetail,
  getProductOptionData,
  getProudctDetailData,
} from '@/actions/product-service';
import CartItemTopController from '@/components/ui/cart/CartItemTopController';
import CartOptionTrigger from '@/components/ui/cart/CartOptionTrigger';
import { Body, Caption } from '@/components/ui/common';
import { priceFormatter } from '@/lib/priceFormatter';

export default async function CartItem({
  cartId,
  checked,
  quantity,
  productCode,
  productDetailCode,
  carvingContent,
}: CartItemDataType) {
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
    <li className='flex flex-col gap-2.5 md:gap-4 border-b border-stroke-100 px-6 py-4'>
      <CartItemTopController cartId={cartId} checked={checked} />
      <div className='flex items-start gap-2.5 md:gap-4'>
        <Link
          href={`/product/${productCode}`}
          className='block w-full min-w-20 max-w-28 relative aspect-square rounded-sm overflow-hidden'
        >
          <Image
            src={product.productThumbnailUrl}
            alt={`${product.productName} 이미지`}
            fill
            unoptimized={true}
            className='object-cover'
            sizes='100%'
            priority
          />
        </Link>

        <div className='grow w-full flex flex-col gap-y-2 py-2'>
          <Caption
            level={1}
            className='!font-medium w-full line-clamp-2 text-text-900 text-wrap'
          >
            {product.productName}
          </Caption>
          <Body>{priceFormatter(productDetail.price * quantity)}원</Body>

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

          <CartOptionTrigger
            quantity={quantity}
            productCode={productCode}
            cartId={cartId}
            options={options}
            productDetail={productDetail}
          />
        </div>
      </div>
    </li>
  );
}
