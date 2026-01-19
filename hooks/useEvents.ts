'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/types';

const STORAGE_KEY = 'calendar-events';

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load events from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored events:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, isLoaded]);

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<Omit<CalendarEvent, 'id'>>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const getEventsForDate = useCallback(
    (date: string) => {
      return events.filter((event) => event.date === date);
    },
    [events]
  );

  return {
    events,
    isLoaded,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };
}
