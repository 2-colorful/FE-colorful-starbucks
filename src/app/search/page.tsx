import SearchForm from '@/components/pages/search/SearchForm';
import RecentSearchList from '@/components/modules/search/RecentSearchList';
import { getRecentSearchHistory } from '@/actions/search-service';

export default async function SearchPage() {
  const recentSearchHistoryData = await getRecentSearchHistory();
  console.log('검색기록', recentSearchHistoryData);

  return (
    <main className='flex flex-col h-full max-h-dvh'>
      <SearchForm />

      <RecentSearchList initialRecentSearches={recentSearchHistoryData} />
    </main>
  );
}
