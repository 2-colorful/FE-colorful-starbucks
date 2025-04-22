import { getEvents } from '@/actions/event-service';
import CategorySlide from '@/components/modules/main/CategorySlide';
import EventSection from '@/components/pages/main/EventSection';
import MainBanner from '@/components/ui/main/MainBanner';

export default async function Home() {
  const events = await getEvents(0, 20);

  return (
    <main className='max-w-3xl mx-auto'>
      <MainBanner events={events} />
      <CategorySlide />
      <EventSection events={events} />
    </main>
  );
}
