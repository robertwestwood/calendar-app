'use client';

import { useState } from 'react';
import { Calendar } from '@/components/Calendar';
import { EventModal } from '@/components/EventModal';
import { useEvents } from '@/hooks/useEvents';
import { useTheme } from '@/hooks/useTheme';
import { CalendarEvent } from '@/types';

export default function Home() {
  const { events, isLoaded, addEvent, updateEvent, deleteEvent } = useEvents();
  const { isDark, toggleTheme, isLoaded: themeLoaded } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedHour, setSelectedHour] = useState<number | undefined>();

  const handleSlotClick = (date: string, hour: number) => {
    setEditingEvent(null);
    setSelectedDate(date);
    setSelectedHour(hour);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(undefined);
    setSelectedHour(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(undefined);
    setSelectedHour(undefined);
  };

  if (!isLoaded || !themeLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col p-4 gap-4">
      {/* App Header - Glass Effect */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="white"
              className="w-6 h-6 drop-shadow-md"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Calendar</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 border border-white/40 shadow-lg transition-all"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>

          {/* New Event Button */}
          <button
            onClick={() => {
              setEditingEvent(null);
              setSelectedDate(new Date().toISOString().split('T')[0]);
              setSelectedHour(9);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-violet-600 text-sm font-semibold rounded-xl hover:bg-white border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Event
          </button>
        </div>
      </header>

      {/* Calendar */}
      <div className="flex-1 overflow-hidden">
        <Calendar
          events={events}
          onSlotClick={handleSlotClick}
          onEventClick={handleEventClick}
        />
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={addEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
        editingEvent={editingEvent}
        initialDate={selectedDate}
        initialHour={selectedHour}
      />
    </main>
  );
}
