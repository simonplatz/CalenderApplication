// 🎯 Calendar App Type Definitions

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Calendar {
  id: string;
  name: string;
  description: string;
  color: string;
  isDefault: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location: string;
  recurrence?: EventRecurrence;
  calendarId: string;
  externalId?: string;
  externalSource?: string;
  createdAt: string;
  updatedAt?: string;
  attendees: EventAttendee[];
}

export interface EventRecurrence {
  type: 'None' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  endDate?: string;
  occurrences?: number;
}

export interface EventAttendee {
  id: string;
  email: string;
  name: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Tentative';
}

// 📝 Form DTOs
export interface CreateEventDto {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location: string;
  recurrence?: EventRecurrence;
  calendarId: string;
  attendees?: CreateEventAttendeeDto[];
}

export interface CreateEventAttendeeDto {
  email: string;
  name: string;
}

export interface CreateCalendarDto {
  name: string;
  description: string;
  color: string;
  isDefault?: boolean;
}

export interface UpdateCalendarDto {
  name: string;
  description: string;
  color: string;
  isVisible: boolean;
}

// 🎨 UI State Types
export interface CalendarViewState {
  currentView: 'month' | 'week' | 'day' | 'list';
  currentDate: Date;
  selectedEvent: Event | null;
  selectedCalendars: string[];
  isEventModalOpen: boolean;
  isCalendarModalOpen: boolean;
}

// 📅 Calendar Display Types
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

export interface CalendarWeek {
  weekStart: Date;
  days: CalendarDay[];
}

// 🔍 Query Types
export interface EventQuery {
  startDate?: string;
  endDate?: string;
  calendarId?: string;
  searchTerm?: string;
}
