import ProductImage from '@/components/ui/products/ProductImage';
import ProductInfoSection from '@/components/modules/product/ProductInfoSection';
import ProductActionsWrapper from '@/components/ui/products/ProductActionsWrapper';
import { getProduct, getProductOptionData } from '@/actions/product-service';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productCode: string }>;
}) {
  const { productCode } = await params;

  const product = await getProduct(Number(productCode));
  const productOptions = await getProductOptionData(Number(productCode));

  return (
    <main className='flex flex-col min-h-screen bg-white'>
      <section className='w-full relative'>
        <ProductImage
          imageUrl={product.productThumbnailUrl}
          name={`${product.productName} 썸네일 이미지`}
          containerClassName='w-full h-full'
          objectFit='cover'
          priority={true}
        />
      </section>
      <ProductInfoSection product={product} />
      <ProductActionsWrapper
        productId={product.productCode}
        productPrice={product.price}
        productOptions={productOptions}
        productName={product.productName}
        productThumbnailUrl={product.productThumbnailUrl}
      />
    </main>
  );
}
