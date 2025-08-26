import { useState, useEffect } from 'react';
import { Event } from '../types';
import { eventsApi } from '../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await eventsApi.getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<Event>) => {
    try {
      const newEvent = await eventsApi.createEvent({
        title: eventData.title || '',
        startDateTime: eventData.startDateTime || new Date().toISOString(),
        endDateTime: eventData.endDateTime || new Date().toISOString(),
        isAllDay: false,
        calendarId: parseInt(eventData.calendarId || '1')
      });
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      console.error('Failed to create event:', err);
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await eventsApi.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    createEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};
