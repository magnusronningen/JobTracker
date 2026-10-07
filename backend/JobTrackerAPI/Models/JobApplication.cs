namespace JobTrackerAPI.Models;

// Representerer en jobbsøknad i appen
// Grunnlag for databasen med ef cores
public class JobApplication
{
    // PK
    public int Id { get; set; }

    public string Company { get; set; } = string.Empty;

    public string? Position { get; set; } = string.Empty;

    public string? Location { get; set; }

    public string? JobUrl { get; set; }

    public DateTime? DateApplied { get; set; }

    public DateTime? Deadline { get; set; }

    public string Status { get; set; } = "Interested";

    public string? Notes { get; set; }
}