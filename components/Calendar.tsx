'use client';

import { useState, useMemo } from 'react';
import { CalendarEvent } from '@/types';
import { TimeSlot } from './TimeSlot';
import {
  getWeekDays,
  formatDate,
  formatDisplayDate,
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">
            {formatMonthYear(weekDays[0])}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Next week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
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
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-slate-200 bg-white sticky top-0 z-10">
            <div className="w-20 border-r border-slate-200" />
            {weekDays.map((day) => {
              const dayIsToday = isToday(day);
              return (
                <div
                  key={formatDate(day)}
                  className={`py-3 px-2 text-center border-r border-slate-200 ${
                    dayIsToday ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p
                    className={`text-lg font-semibold mt-0.5 ${
                      dayIsToday
                        ? 'text-white bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center mx-auto'
                        : 'text-slate-800'
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
            <div className="w-20">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-16 pr-3 text-right text-xs text-slate-400 font-medium border-r border-slate-200 pt-0 -mt-2"
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
                  {HOURS.map((hour) => (
                    <TimeSlot
                      key={`${dateStr}-${hour}`}
                      date={dateStr}
                      hour={hour}
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
