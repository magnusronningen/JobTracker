using JobTrackerAPI.Data;
using JobTrackerAPI.Interfaces;
using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly JobTrackerContext _context;
    public JobApplicationService(JobTrackerContext context)
    {
        _context = context;
    }

    // Get all
    public async Task<List<JobApplication>> GetAll()
    {
        return await _context.JobApplications.ToListAsync();
    }

    // Get by id
    public async Task<JobApplication?> GetById(int id)
    {
        return await _context.JobApplications.FindAsync(id);
    }

    // Create
    public async Task<JobApplication> Create(JobApplication application)
    {
        _context.JobApplications.Add(application);

        await _context.SaveChangesAsync();

        return application;
    }

    // Update
    public async Task<bool> Update(int id, JobApplication application)
    {
        if (id != application.Id)
        {
            return false;
        }

        JobApplication? existingApplication =
            await _context.JobApplications.FindAsync(id);

        if (existingApplication == null)
        {
            return false;
        }

        existingApplication.Company = application.Company;
        existingApplication.Position = application.Position;
        existingApplication.Location = application.Location;
        existingApplication.JobUrl = application.JobUrl;
        existingApplication.DateApplied = application.DateApplied;
        existingApplication.Deadline = application.Deadline;
        existingApplication.Status = application.Status;
        existingApplication.Notes = application.Notes;

        await _context.SaveChangesAsync();

        return true;
    }

    // Delete
    public async Task<bool> Delete(int id)
    {
        JobApplication? application =
            await _context.JobApplications.FindAsync(id);

        if (application == null)
        {
            return false;
        }

        _context.JobApplications.Remove(application);

        await _context.SaveChangesAsync();

        return true;
    }

}