import axios from 'axios';
import { Event } from '../types';

const API_BASE_URL = 'http://localhost:5048/api';

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

  createEvent: async (eventData: {
    title: string;
    startDateTime: string;
    endDateTime: string;
  }): Promise<Event> => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};


