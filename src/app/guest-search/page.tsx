import RecentSearchListGuest from '@/components/modules/search/RecentSearchListGuest';
import GuestSearchForm from '@/components/pages/search/GuestSearchFrom';

export default function GuestSearchPage() {
  return (
    <main className='flex flex-col h-full max-h-dvh'>
      <GuestSearchForm />
      <RecentSearchListGuest />
    </main>
  );
}
