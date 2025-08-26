// Basic TypeScript interfaces for the calendar app
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location?: string;
  calendarId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt?: string;
}
