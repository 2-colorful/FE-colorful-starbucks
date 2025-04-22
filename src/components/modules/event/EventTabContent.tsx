'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { EventResponseType } from '@/actions/event-service';
import EventTab from '@/components/ui/event/EventTab';

interface EventTabContentProps {
  events: EventResponseType[];
  activeEventId?: string;
}

export default function EventTabContent({
  events,
  activeEventId,
}: EventTabContentProps) {
  const router = useRouter();
  const activeTabRef = useRef<HTMLLIElement>(null);

  const handleEventClick = (eventUuid: string) => {
    router.replace(`?eventId=${eventUuid}`);
  };

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeEventId]);

  return (
    <ul className='flex overflow-x-auto scrollbar-hidden'>
      {events.map((event) => {
        const isActive = activeEventId === event.eventUuid;
        return (
          <li
            key={event.eventUuid}
            className='flex-shrink-0'
            // 활성화된 탭에 ref 추가
            ref={isActive ? activeTabRef : null}
          >
            <EventTab
              title={event.title}
              isActive={isActive}
              onClick={() => handleEventClick(event.eventUuid)}
            />
          </li>
        );
      })}
    </ul>
  );
}
