using Microsoft.EntityFrameworkCore;

namespace SimpleCalendarAPI;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public bool IsAllDay { get; set; }
    public string? Location { get; set; }
    public int CalendarId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public class CalendarDbContext : DbContext
{
    public CalendarDbContext(DbContextOptions<CalendarDbContext> options) : base(options) { }

    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed some initial data
        modelBuilder.Entity<Event>().HasData(
            new Event
            {
                Id = 1,
                Title = "Welcome Event",
                Description = "Welcome to your simple calendar!",
                StartDateTime = DateTime.UtcNow,
                EndDateTime = DateTime.UtcNow.AddHours(1),
                IsAllDay = false,
                CalendarId = 1,
                CreatedAt = DateTime.UtcNow
            },
            new Event
            {
                Id = 2,
                Title = "Sample Meeting",
                Description = "This is a sample meeting",
                StartDateTime = DateTime.UtcNow.AddDays(1),
                EndDateTime = DateTime.UtcNow.AddDays(1).AddHours(2),
                IsAllDay = false,
                CalendarId = 1,
                CreatedAt = DateTime.UtcNow
            }
        );
    }
}
