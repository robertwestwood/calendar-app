'use client';

import { CalendarEvent } from '@/types';
import { EventCard } from './EventCard';

interface TimeSlotProps {
  date: string;
  hour: number;
  hourIndex: number;
  events: CalendarEvent[];
  onSlotClick: (date: string, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
  isToday: boolean;
}

export function TimeSlot({
  date,
  hour,
  hourIndex,
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

  const isEvenRow = hourIndex % 2 === 0;

  return (
    <div
      onClick={() => onSlotClick(date, hour)}
      className={`relative h-16 border-b border-r cursor-pointer transition-all
        ${isToday
          ? 'bg-violet-50/40 border-violet-200/50 hover:bg-violet-100/50'
          : isEvenRow
            ? 'bg-white/30 border-white/30 hover:bg-white/50'
            : 'bg-white/10 border-white/30 hover:bg-white/40'
        }
        hover:backdrop-blur-sm
      `}
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
