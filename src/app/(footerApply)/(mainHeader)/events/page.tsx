import React from 'react';

import EventTabBar from '@/components/layouts/event/EventTabBar';
import { getDetailEvent, getEvents } from '@/actions/event-service';
import EventDetailSection from '@/components/layouts/event/EventDetailSection';
import EventProductsList from '@/components/pages/event/EventProductsList';

type EventSearchParamsType = {
  eventId: string;
  title: string;
};

type SearchParams = Promise<EventSearchParamsType>;

export default async function EventsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const events = await getEvents(0, 10);

  let activeEventId = searchParams.eventId;

  if (!activeEventId && events.length > 0) {
    activeEventId = events[0].eventUuid;
  }
  const eventDetail = await getDetailEvent(activeEventId);

  return (
    <main>
      <EventTabBar events={events} activeEventId={activeEventId} />
      <EventDetailSection eventDetail={eventDetail} />
      <EventProductsList eventUuid={activeEventId} />
    </main>
  );
}
