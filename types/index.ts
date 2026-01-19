export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  color: EventColor;
}

export type EventColor = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose';

export interface TimeSlotInfo {
  date: string;
  hour: number;
}

export const EVENT_COLORS: { value: EventColor; label: string; bg: string; border: string }[] = [
  { value: 'blue', label: 'Blue', bg: 'bg-blue-100', border: 'border-blue-300' },
  { value: 'violet', label: 'Violet', bg: 'bg-violet-100', border: 'border-violet-300' },
  { value: 'emerald', label: 'Green', bg: 'bg-emerald-100', border: 'border-emerald-300' },
  { value: 'amber', label: 'Amber', bg: 'bg-amber-100', border: 'border-amber-300' },
  { value: 'rose', label: 'Rose', bg: 'bg-rose-100', border: 'border-rose-300' },
];
