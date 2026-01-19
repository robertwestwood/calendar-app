'use client';

import { CalendarEvent, EVENT_COLORS } from '@/types';
import { formatTime } from '@/utils/date';

interface EventCardProps {
  event: CalendarEvent;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const colorConfig = EVENT_COLORS.find((c) => c.value === event.color) || EVENT_COLORS[0];

  // Calculate position and height based on time
  const [startHour, startMinute] = event.startTime.split(':').map(Number);
  const [endHour, endMinute] = event.endTime.split(':').map(Number);

  const startOffset = startMinute / 60;
  const duration = endHour - startHour + (endMinute - startMinute) / 60;
  const heightPercent = Math.max(duration * 100, 25); // Minimum 25% height for visibility

  return (
    <button
      onClick={onClick}
      className={`absolute left-1 right-1 ${colorConfig.bg} ${colorConfig.border} border-l-4 rounded-r-md px-2 py-1 text-left overflow-hidden hover:shadow-md transition-shadow cursor-pointer`}
      style={{
        top: `${startOffset * 100}%`,
        height: `${heightPercent}%`,
        minHeight: '24px',
      }}
    >
      <p className="text-xs font-medium text-slate-800 truncate">{event.title}</p>
      <p className="text-xs text-slate-500 truncate">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </p>
    </button>
  );
}
