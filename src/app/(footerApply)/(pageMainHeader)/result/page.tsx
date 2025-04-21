import { getSearchResults, getSearchCounts } from '@/actions/search-service';
import SearchResultHeader from '@/components/modules/search/SearchResultHeader';
import SearchResultList from '@/components/modules/search/SearchResultList';
import { transformSearchParams } from '@/lib/search/util';

export const dynamic = 'force-dynamic';

export default async function SearchResultPage({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<{
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const searchParams = await rawSearchParams;

  if (!searchParams.query) {
    return (
      <main className='flex flex-col h-full max-h-dvh'>
        <div className='flex flex-col items-center justify-center h-full p-6'>
          <p className='text-lg text-gray-500'>검색어를 입력해주세요.</p>
        </div>
      </main>
    );
  }

  const apiParams = transformSearchParams(searchParams);

  try {
    const [searchResults, categoryCounts] = await Promise.all([
      getSearchResults(apiParams),
      getSearchCounts({
        query: searchParams.query,
        minPrice: apiParams.minPrice,
        maxPrice: apiParams.maxPrice,
      }),
    ]);

    return (
      <main className='flex flex-col h-full max-h-dvh'>
        <SearchResultHeader
          query={searchParams.query}
          categoryCounts={categoryCounts}
        />
        <SearchResultList params={apiParams} initialData={searchResults} />
      </main>
    );
  } catch (error) {
    console.error('검색 결과를 가져오는 중 오류 발생:', error);

    return (
      <main className='flex flex-col h-full max-h-dvh'>
        <div className='flex flex-col items-center justify-center h-full p-6'>
          <p className='text-lg text-gray-500'>
            검색 결과를 불러오는 데 실패했습니다.
          </p>
        </div>
      </main>
    );
  }
}
