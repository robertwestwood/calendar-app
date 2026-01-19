'use client';

import { useState } from 'react';
import { Calendar } from '@/components/Calendar';
import { EventModal } from '@/components/EventModal';
import { useEvents } from '@/hooks/useEvents';
import { CalendarEvent } from '@/types';

export default function Home() {
  const { events, isLoaded, addEvent, updateEvent, deleteEvent } = useEvents();
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

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-white">
      {/* App Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-slate-800">Calendar</h1>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setSelectedDate(new Date().toISOString().split('T')[0]);
            setSelectedHour(9);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Event
        </button>
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
