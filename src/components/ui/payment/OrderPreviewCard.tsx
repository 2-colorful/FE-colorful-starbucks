import { cn } from '@/lib/utils';

import { getProductDetail } from '@/actions/product-service';
import Image from 'next/image';
import { Body } from '../common';

type OrderPreviewCardProps = {
  productCode: number;
};

export default async function OrderPreviewCard({
  productCode,
}: OrderPreviewCardProps) {
  const [product] = await Promise.all([getProductDetail(productCode)]);

  return (
    <div
      className={cn(
        'flex gap-3 group-data-[state=closed]:py-4 items-center w-full overflow-hidden transition-all duration-300 ease-in-out',
        'opacity-100 max-h-40 group-data-[state=open]:opacity-0 group-data-[state=open]:max-h-0',
      )}
    >
      <Image
        src={product.productThumbnailUrl}
        alt={product.productName}
        unoptimized={true}
        width={80}
        height={80}
        priority
        className='rounded-xl'
      />
      <Body className='text-text-900 line-clamp-2'>{product.productName}</Body>
    </div>
  );
}
