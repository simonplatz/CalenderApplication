import { useState, useEffect } from 'react';
import { Event } from '../types';
import { eventsApi } from '../services/api';

// Define CreateEventRequest type if not imported from elsewhere
type CreateEventRequest = {
    title: string;
    startDateTime: string;
    endDateTime: string;
};

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedEvents = await eventsApi.getEvents();
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
                startDateTime: new Date().toISOString(),
                endDateTime: new Date().toISOString()
            };

            const newEvent = await eventsApi.createEvent(createRequest);
            setEvents(prev => [...prev, newEvent]);
            return newEvent;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create event');
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
        deleteEvent,
        refetch: fetchEvents
    };
};
