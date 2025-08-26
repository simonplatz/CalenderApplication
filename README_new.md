# Simple Calendar Application

A basic calendar application built with React TypeScript frontend and ASP.NET Core backend.

## Features

- **View Events**: Display all events in a simple list
- **Add Events**: Create new events with just a title
- **Delete Events**: Remove events from the list
- **Real Backend**: Connected to ASP.NET Core API with SQLite database

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: ASP.NET Core 9 + Entity Framework Core
- **Database**: SQLite (development)

## Quick Start

### Prerequisites
- Node.js 18+
- .NET 9 SDK

### 1. Start Backend
```bash
cd backend/CalendarApplication.API
dotnet run
```
Backend runs on: `http://localhost:5238`

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5174`

## Project Structure

```
├── backend/                 # ASP.NET Core API
│   ├── CalendarApplication.API/
│   ├── CalendarApplication.Core/
│   └── CalendarApplication.Infrastructure/
├── frontend/               # React TypeScript App
│   └── src/
│       ├── App.tsx         # Main component
│       ├── hooks/          # React hooks
│       ├── services/       # API client
│       ├── types/          # TypeScript interfaces
│       └── styles/         # CSS files
└── README.md
```

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `DELETE /api/events/{id}` - Delete event

## Development

The application is designed to be simple and easily expandable. You can add features like:

- Event editing
- Date/time selection
- Event descriptions and locations
- Calendar grid view
- Multiple calendars
- Event filtering

For more details, see `SIMPLE_VERSION_README.md`.
