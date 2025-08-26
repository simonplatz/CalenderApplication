# Simple Calendar App

A basic calendar application with minimal features to serve as a foundation for expansion.

## Current Features

- **View Events**: Display all events in a simple list
- **Add Events**: Create new events with just a title (auto-sets current date/time)
- **Delete Events**: Remove events from the list
- **Real Backend**: Connected to ASP.NET Core API with SQLite database

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: ASP.NET Core 9 + Entity Framework Core
- **Database**: SQLite (development)

## Current Structure

### Frontend (`/frontend/src/`)
- `App.tsx` - Main component with simple event list and add form
- `hooks/useEvents.ts` - Basic hook for event CRUD operations
- `services/api.ts` - Simple API client with minimal endpoints
- `types/index.ts` - Basic TypeScript interfaces

### Backend (`/backend/`)
- Full ASP.NET Core API with Clean Architecture
- Entity Framework with SQLite database
- Swagger documentation at `http://localhost:5238/swagger`

## How to Run

1. **Start Backend**:
   ```bash
   cd backend/CalendarApplication.API
   dotnet run
   ```
   Runs on: `http://localhost:5238`

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Runs on: `http://localhost:5174`

## Easy Expansion Ideas

### Frontend Enhancements
- Add event editing functionality
- Add date picker for event creation
- Add event description and location fields
- Create a calendar grid view
- Add event filtering and search
- Add multiple calendar support
- Add event categories/colors

### Backend Enhancements
- Add user authentication
- Add calendar sharing
- Add event reminders
- Add recurring events
- Add external calendar integration
- Add email notifications

## Files to Modify for Expansion

1. **Add new features**: Modify `App.tsx` and `useEvents.ts`
2. **Add new data fields**: Update `types/index.ts` and backend models
3. **Add new API endpoints**: Update `services/api.ts` and backend controllers
4. **Add new components**: Create new files in `components/` folder

## Complex Version Backup

The original complex version with full calendar grid, modals, and advanced features is backed up as:
- `App_complex.tsx`
- `hooks/useEvents_complex.ts`
- `services/api_complex.ts`
- `types/index_complex.ts`

You can restore the complex version by renaming these files back to their original names.
