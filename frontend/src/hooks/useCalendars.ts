import { useState, useEffect } from 'react';
import { Calendar } from '../types';
import { calendarApi, CreateCalendarRequest, UpdateCalendarRequest } from '../services/api';

export const useCalendars = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendars = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCalendars = await calendarApi.getCalendars();
      setCalendars(fetchedCalendars);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calendars');
    } finally {
      setLoading(false);
    }
  };

  const createCalendar = async (calendarData: CreateCalendarRequest) => {
    try {
      const newCalendar = await calendarApi.createCalendar(calendarData);
      setCalendars(prev => [...prev, newCalendar]);
      return newCalendar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create calendar');
      throw err;
    }
  };

  const updateCalendar = async (id: string, calendarData: UpdateCalendarRequest) => {
    try {
      const updatedCalendar = await calendarApi.updateCalendar(id, calendarData);
      setCalendars(prev => prev.map(calendar => calendar.id === id ? updatedCalendar : calendar));
      return updatedCalendar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update calendar');
      throw err;
    }
  };

  const deleteCalendar = async (id: string) => {
    try {
      await calendarApi.deleteCalendar(id);
      setCalendars(prev => prev.filter(calendar => calendar.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete calendar');
      throw err;
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  return {
    calendars,
    loading,
    error,
    createCalendar,
    updateCalendar,
    deleteCalendar,
    refetch: fetchCalendars
  };
};
