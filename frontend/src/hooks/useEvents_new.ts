import { useState, useEffect } from 'react';
import { Event } from '../types';
import { eventsApi, CreateEventRequest, UpdateEventRequest } from '../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await eventsApi.getEvents(startDate, endDate);
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<Event>) => {
    try {
      const createRequest: CreateEventRequest = {
        title: eventData.title || '',
        description: eventData.description,
        startDateTime: eventData.startDateTime || new Date().toISOString(),
        endDateTime: eventData.endDateTime || new Date().toISOString(),
        isAllDay: eventData.isAllDay || false,
        location: eventData.location,
        calendarId: parseInt(eventData.calendarId || '1')
      };

      const newEvent = await eventsApi.createEvent(createRequest);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      const updateRequest: UpdateEventRequest = {
        title: eventData.title || '',
        description: eventData.description,
        startDateTime: eventData.startDateTime || new Date().toISOString(),
        endDateTime: eventData.endDateTime || new Date().toISOString(),
        isAllDay: eventData.isAllDay || false,
        location: eventData.location,
        calendarId: parseInt(eventData.calendarId || '1')
      };

      const updatedEvent = await eventsApi.updateEvent(id, updateRequest);
      setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await eventsApi.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};
