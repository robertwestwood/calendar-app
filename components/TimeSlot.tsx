'use client';

import { CalendarEvent } from '@/types';
import { EventCard } from './EventCard';

interface TimeSlotProps {
  date: string;
  hour: number;
  events: CalendarEvent[];
  onSlotClick: (date: string, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
  isToday: boolean;
}

export function TimeSlot({
  date,
  hour,
  events,
  onSlotClick,
  onEventClick,
  isToday,
}: TimeSlotProps) {
  // Filter events that start at this hour
  const slotEvents = events.filter((event) => {
    const [eventHour] = event.startTime.split(':').map(Number);
    return eventHour === hour;
  });

  return (
    <div
      onClick={() => onSlotClick(date, hour)}
      className={`relative h-16 border-b border-r border-slate-200 cursor-pointer transition-colors hover:bg-slate-50 ${
        isToday ? 'bg-blue-50/30' : ''
      }`}
    >
      {slotEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
}
