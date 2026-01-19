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
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute left-1 right-1 ${colorConfig.bg} ${colorConfig.text} ${colorConfig.hover} backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-left overflow-hidden shadow-lg ${colorConfig.shadow} hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border border-white/20`}
      style={{
        top: `${startOffset * 100}%`,
        height: `${heightPercent}%`,
        minHeight: '28px',
      }}
    >
      <p className="text-xs font-semibold truncate drop-shadow-sm">{event.title}</p>
      <p className={`text-xs truncate ${colorConfig.text === 'text-white' ? 'text-white/80' : 'text-amber-700'}`}>
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </p>
    </button>
  );
}
