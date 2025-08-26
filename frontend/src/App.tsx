import React, { useState } from 'react';
import { useEvents } from './hooks/useEvents';
import './styles/globals.css';

function App() {
  const [newEventTitle, setNewEventTitle] = useState('');
  const { events, loading, createEvent, deleteEvent } = useEvents();

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    await createEvent({
      title: newEventTitle,
      startDateTime: new Date().toISOString(),
      endDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
      calendarId: '1'
    });
    setNewEventTitle('');
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Simple Calendar</h1>
        
        {/* Add Event Form */}
        <form onSubmit={handleAddEvent} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex gap-2">
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Enter event title..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Event
            </button>
          </div>
        </form>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-4 border-b">Events</h2>
          <div className="divide-y">
            {events.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">No events found</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.startDateTime).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
