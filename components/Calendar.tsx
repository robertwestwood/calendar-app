'use client';

import { useState, useMemo } from 'react';
import { CalendarEvent } from '@/types';
import { TimeSlot } from './TimeSlot';
import {
  getWeekDays,
  formatDate,
  formatMonthYear,
  formatHour,
  isToday,
  HOURS,
} from '@/utils/date';

interface CalendarProps {
  events: CalendarEvent[];
  onSlotClick: (date: string, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function Calendar({ events, onSlotClick, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date);
  };

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden">
      {/* Header - Glass Nav */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md border-b border-white/30">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {formatMonthYear(weekDays[0])}
          </h2>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-semibold text-violet-600 bg-white/60 backdrop-blur-sm border border-violet-200/50 rounded-xl hover:bg-white/80 hover:border-violet-300 transition-all shadow-sm"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPreviousWeek}
            className="p-2.5 text-slate-600 hover:bg-white/60 hover:text-slate-800 rounded-xl transition-all backdrop-blur-sm"
            aria-label="Previous week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2.5 text-slate-600 hover:bg-white/60 hover:text-slate-800 rounded-xl transition-all backdrop-blur-sm"
            aria-label="Next week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[800px]">
          {/* Day Headers - Glass */}
          <div className="grid grid-cols-8 bg-white/40 backdrop-blur-sm sticky top-0 z-10 border-b border-white/30">
            <div className="w-20 border-r border-white/30 bg-white/30" />
            {weekDays.map((day) => {
              const dayIsToday = isToday(day);
              return (
                <div
                  key={formatDate(day)}
                  className={`py-4 px-2 text-center border-r border-white/30 ${
                    dayIsToday
                      ? 'bg-gradient-to-b from-violet-100/60 to-purple-100/60 backdrop-blur-sm'
                      : 'bg-white/20'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider ${
                    dayIsToday ? 'text-violet-600' : 'text-slate-500'
                  }`}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p
                    className={`text-xl font-bold mt-1 ${
                      dayIsToday
                        ? 'text-white bg-gradient-to-br from-violet-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-violet-300/50'
                        : 'text-slate-700'
                    }`}
                  >
                    {day.getDate()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div className="w-20 bg-white/30 backdrop-blur-sm">
              {HOURS.map((hour, index) => (
                <div
                  key={hour}
                  className={`h-16 pr-3 text-right text-xs font-semibold border-r border-white/30 pt-0 -mt-2 ${
                    index % 2 === 0 ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {formatHour(hour)}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDays.map((day) => {
              const dateStr = formatDate(day);
              const dayIsToday = isToday(day);
              const dayEvents = getEventsForDate(dateStr);

              return (
                <div key={dateStr} className="flex flex-col">
                  {HOURS.map((hour, index) => (
                    <TimeSlot
                      key={`${dateStr}-${hour}`}
                      date={dateStr}
                      hour={hour}
                      hourIndex={index}
                      events={dayEvents}
                      onSlotClick={onSlotClick}
                      onEventClick={onEventClick}
                      isToday={dayIsToday}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
