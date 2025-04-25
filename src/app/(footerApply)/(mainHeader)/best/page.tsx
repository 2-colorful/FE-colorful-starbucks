import {
  getBestProducts,
  getBestProductsCategories,
} from '@/actions/best-product-service';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import BestProductList from '@/components/pages/product/BestProductList';

type BestSearchParamsType = {
  topCategoryId: string;
};

export default async function BestProductsPage({
  searchParams,
}: {
  searchParams: Promise<BestSearchParamsType>;
}) {
  const params = await searchParams;
  const topCategoryId = params.topCategoryId || '17';

  const [topCategories, products] = await Promise.all([
    getBestProductsCategories(),
    getBestProducts(Number(topCategoryId)),
  ]);

  return (
    <>
      <nav>
        <ProductCategoryTopTabBar topCategory={topCategories} />
      </nav>
      <main>
        <BestProductList products={products} />
      </main>
    </>
  );
}
