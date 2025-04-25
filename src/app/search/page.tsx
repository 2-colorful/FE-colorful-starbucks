import { isUserLoggedIn } from '@/actions/auth-service';
import { getRecentSearchHistory } from '@/actions/search-service';
import SearchForm from '@/components/pages/search/SearchForm';
import RecentSearchList from '@/components/modules/search/RecentSearchList';
import ClientSearchWrapper from '@/components/modules/search/ClientSearchWrapper';
export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    const recentSearchHistoryData = await getRecentSearchHistory();

    return (
      <main className='flex flex-col h-full max-h-dvh'>
        <SearchForm />
        <RecentSearchList initialRecentSearches={recentSearchHistoryData} />
      </main>
    );
  } else {
    return <ClientSearchWrapper />;
  }
}
