using JobTrackerAPI.Models;

namespace JobTrackerAPI.Interfaces;

public interface IJobApplicationService
{
    Task<List<JobApplication>> GetAll();
    Task<JobApplication?> GetById(int id);
    Task<JobApplication> Create(JobApplication application);
    Task<bool> Update(int id, JobApplication application);
    Task<bool> Delete(int id);
}