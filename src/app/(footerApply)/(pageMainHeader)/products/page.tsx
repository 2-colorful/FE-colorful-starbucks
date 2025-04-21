import {
  getBottomCategories,
  getInitialFilteredProducts,
  getTopCategories,
} from '@/actions/product-service';
import ProductCategoryTopTabBar from '@/components/layouts/product/ProductCategoryTopTabBar';
import ProductDetailCategorySection from '@/components/layouts/product/ProductDetailCategorySection';
import FilteredProductList from '@/components/pages/product/FilteredProductList';
import { SearchParamsType } from '@/data/productDummy/productSearchTypes';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = await searchParams;
  const filteredParams: SearchParamsType = {};
  if (!params.page) {
    params.page = '0';
  }

  Object.entries(params).forEach(([key, value]) => {
    filteredParams[key] = value;
  });

  const topCategoryId = params.topCategoryId || '0';

  const [topCategory, bottomCategory, initialData] = await Promise.all([
    getTopCategories(),
    getBottomCategories(Number(topCategoryId)),
    getInitialFilteredProducts(filteredParams),
  ]);

  return (
    <>
      <header>
        <nav>
          <ProductCategoryTopTabBar topCategory={topCategory} />
          <ProductDetailCategorySection
            topCategoryId={topCategoryId}
            bottomCategory={bottomCategory}
          />
        </nav>
      </header>
      <main>
        <FilteredProductList
          params={filteredParams}
          initialData={initialData}
        />
      </main>
    </>
  );
}
