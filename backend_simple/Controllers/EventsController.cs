using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SimpleCalendarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly CalendarDbContext _context;

    public EventsController(CalendarDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);

        if (eventItem == null)
        {
            return NotFound();
        }

        return eventItem;
    }

    [HttpPost]
    public async Task<ActionResult<Event>> CreateEvent(CreateEventRequest request)
    {
        var eventItem = new Event
        {
            Title = request.Title,
            Description = request.Description,
            StartDateTime = request.StartDateTime,
            EndDateTime = request.EndDateTime,
            IsAllDay = request.IsAllDay,
            Location = request.Location,
            CalendarId = request.CalendarId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Events.Add(eventItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, eventItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, UpdateEventRequest request)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        eventItem.Title = request.Title;
        eventItem.Description = request.Description;
        eventItem.StartDateTime = request.StartDateTime;
        eventItem.EndDateTime = request.EndDateTime;
        eventItem.IsAllDay = request.IsAllDay;
        eventItem.Location = request.Location;
        eventItem.CalendarId = request.CalendarId;
        eventItem.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)
        {
            return NotFound();
        }

        _context.Events.Remove(eventItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public record CreateEventRequest(
    string Title,
    string? Description,
    DateTime StartDateTime,
    DateTime EndDateTime,
    bool IsAllDay,
    string? Location,
    int CalendarId
);

public record UpdateEventRequest(
    string Title,
    string? Description,
    DateTime StartDateTime,
    DateTime EndDateTime,
    bool IsAllDay,
    string? Location,
    int CalendarId
);
