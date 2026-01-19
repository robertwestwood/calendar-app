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

export const EVENT_COLORS: { value: EventColor; label: string; bg: string; text: string; hover: string; shadow: string }[] = [
  { value: 'blue', label: 'Blue', bg: 'bg-blue-500/85', text: 'text-white', hover: 'hover:bg-blue-500/95', shadow: 'shadow-blue-500/30' },
  { value: 'violet', label: 'Violet', bg: 'bg-violet-500/85', text: 'text-white', hover: 'hover:bg-violet-500/95', shadow: 'shadow-violet-500/30' },
  { value: 'emerald', label: 'Green', bg: 'bg-emerald-500/85', text: 'text-white', hover: 'hover:bg-emerald-500/95', shadow: 'shadow-emerald-500/30' },
  { value: 'amber', label: 'Amber', bg: 'bg-amber-400/90', text: 'text-amber-900', hover: 'hover:bg-amber-400', shadow: 'shadow-amber-400/30' },
  { value: 'rose', label: 'Rose', bg: 'bg-rose-500/85', text: 'text-white', hover: 'hover:bg-rose-500/95', shadow: 'shadow-rose-500/30' },
];
