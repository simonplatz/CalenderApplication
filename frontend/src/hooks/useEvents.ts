import { useState, useEffect } from 'react';
import { Event, CreateEventRequest } from '../types';
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

  const createEvent = async (eventData: CreateEventRequest) => {
    try {
      const newEvent = await eventsApi.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      console.error('Failed to create event:', err);
      throw err;
    }
  };

  const deleteEvent = async (id: number) => {
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
