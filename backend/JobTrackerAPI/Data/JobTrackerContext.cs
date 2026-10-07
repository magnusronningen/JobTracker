using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Data;

// Forbindelsen mellom applikasjonen og db
public class JobTrackerContext : DbContext
{
    // Constructor som mottar config fra efc 
    public JobTrackerContext(DbContextOptions<JobTrackerContext> options)
        : base(options)
    {
    }

    // Tabellen i db
    public DbSet<JobApplication> JobApplications { get; set; }
}