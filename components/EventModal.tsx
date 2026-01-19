'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent, EventColor, EVENT_COLORS } from '@/types';
import { getTimeOptions, formatDisplayDate, parseDate } from '@/utils/date';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Omit<CalendarEvent, 'id'>>) => void;
  onDelete: (id: string) => void;
  editingEvent: CalendarEvent | null;
  initialDate?: string;
  initialHour?: number;
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  editingEvent,
  initialDate,
  initialHour,
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState<EventColor>('blue');

  const timeOptions = getTimeOptions();

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setColor(editingEvent.color);
    } else if (initialDate) {
      setTitle('');
      setDate(initialDate);
      const hour = initialHour ?? 9;
      setStartTime(`${String(hour).padStart(2, '0')}:00`);
      setEndTime(`${String(hour + 1).padStart(2, '0')}:00`);
      setColor('blue');
    }
  }, [editingEvent, initialDate, initialHour, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    if (editingEvent) {
      onUpdate(editingEvent.id, { title, date, startTime, endTime, color });
    } else {
      onSave({ title, date, startTime, endTime, color });
    }
    onClose();
  };

  const handleDelete = () => {
    if (editingEvent) {
      onDelete(editingEvent.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - stronger blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal - Glass Effect */}
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/50 animate-in zoom-in-95 duration-200">
        {/* Header with glass gradient */}
        <div className="bg-gradient-to-r from-violet-500/90 via-purple-500/90 to-fuchsia-500/90 backdrop-blur-sm px-6 py-5 border-b border-white/20">
          <h2 className="text-xl font-bold text-white drop-shadow-sm">
            {editingEvent ? 'Edit Event' : 'New Event'}
          </h2>
          {date && (
            <p className="text-sm text-white/80 mt-1">
              {formatDisplayDate(parseDate(date))}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Event title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white/80 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              autoFocus
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white/80 transition-all text-slate-800 font-medium"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Start time
              </label>
              <select
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white/80 transition-all text-slate-800 font-medium"
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                End time
              </label>
              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white/80 transition-all text-slate-800 font-medium"
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Color
            </label>
            <div className="flex gap-3">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-xl ${c.bg} backdrop-blur-sm shadow-lg ${c.shadow} border border-white/30 transition-all ${
                    color === c.value
                      ? 'ring-4 ring-offset-2 ring-slate-300 scale-110'
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
            {editingEvent ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 text-sm font-semibold text-red-600 hover:text-white hover:bg-red-500/80 hover:backdrop-blur-sm rounded-xl transition-all"
              >
                Delete
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white/60 backdrop-blur-sm rounded-xl transition-all border border-transparent hover:border-white/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !date}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500/90 to-purple-500/90 backdrop-blur-sm rounded-xl hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-300/50 hover:shadow-xl border border-white/20 transition-all"
              >
                {editingEvent ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
