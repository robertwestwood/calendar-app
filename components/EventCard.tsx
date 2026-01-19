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
      {event.comment && (
        <span className="absolute top-1 right-1" title={event.comment}>
          <svg
            className={`w-3 h-3 ${colorConfig.text === 'text-white' ? 'text-white/70' : 'text-amber-700/70'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
