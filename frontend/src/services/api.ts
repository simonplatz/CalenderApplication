import axios from 'axios';
import { Event, CreateEventRequest } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsApi = {
  getEvents: async (): Promise<Event[]> => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  createEvent: async (eventData: CreateEventRequest): Promise<Event> => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  deleteEvent: async (id: number): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};
