// 🎯 Simplified Calendar App Types

export interface Event {
  id: number;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location?: string;
  calendarId: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location?: string;
  calendarId: number;
}

export interface UpdateEventRequest {
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location?: string;
  calendarId: number;
}

