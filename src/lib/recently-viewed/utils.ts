import { fetchRecentlyViewedItem } from '@/actions/product-service';
import { DailyRecentlyViewedProductsType } from '@/types/products/productTypes';

export interface RecentlyViewedItem {
  productCode: number;
  productThumbnailUrl?: string;
  viewedAt: string;
}

export interface ProductType {
  productCode: number;
  productThumbnailUrl?: string;
}

export const LOCAL_STORAGE_KEY = 'recentlyViewedItems';
export const MAX_RECENT_ITEMS = 20;

export const storeRecentlyViewedProduct = (
  productCode: number,
  productThumbnailUrl?: string,
): void => {
  try {
    if (typeof window === 'undefined') return;

    const viewedAt = new Date().toISOString();

    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    let recentItems: RecentlyViewedItem[] = storedItems
      ? JSON.parse(storedItems)
      : [];

    recentItems = recentItems.filter(
      (item) => item.productCode !== productCode,
    );

    recentItems.unshift({
      productCode,
      productThumbnailUrl,
      viewedAt,
    });

    if (recentItems.length > MAX_RECENT_ITEMS) {
      recentItems = recentItems.slice(0, MAX_RECENT_ITEMS);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentItems));
  } catch (error) {
    console.error('최근 본 상품 로컬스토리지 저장 실패:', error);
  }
};

export const getRecentlyViewedProducts = (): RecentlyViewedItem[] => {
  try {
    if (typeof window === 'undefined') return [];

    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('최근 본 상품 로컬스토리지 조회 실패:', error);
    return [];
  }
};

export const checkAndMigrateLocalStorage = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storedItems) return false;

    const recentItems = JSON.parse(storedItems) as RecentlyViewedItem[];

    if (!recentItems || recentItems.length === 0) return false;

    for (const item of recentItems) {
      try {
        await fetchRecentlyViewedItem(
          item.productCode,
          item.productThumbnailUrl || '',
        );
        console.log(`상품 코드 ${item.productCode} 추가 완료`);
      } catch (error) {
        console.error(`상품 코드 ${item.productCode} 추가 실패:`, error);
      }
    }

    localStorage.removeItem(LOCAL_STORAGE_KEY);

    console.log(
      '최근 본 상품 데이터 이관 완료:',
      recentItems.length,
      '개 항목',
    );
    return true;
  } catch (error) {
    console.error('최근 본 상품 데이터 이관 실패:', error);
    return false;
  }
};

export function groupItemsByDate(
  items: RecentlyViewedItem[],
): DailyRecentlyViewedProductsType[] {
  if (!items || items.length === 0) return [];

  const groupedItems: Record<string, DailyRecentlyViewedProductsType> = {};

  items.forEach((item) => {
    const datePart = item.viewedAt.split('T')[0];

    if (!groupedItems[datePart]) {
      groupedItems[datePart] = {
        viewedAt: datePart,
        recentlyViewProducts: [],
      };
    }

    groupedItems[datePart].recentlyViewProducts.push({
      productCode: item.productCode,
      productThumbnailUrl: item.productThumbnailUrl,
    });
  });

  return Object.values(groupedItems).sort(
    (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime(),
  );
}
