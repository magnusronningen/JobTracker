using JobTrackerAPI.Data;
using JobTrackerAPI.Interfaces;
using JobTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationsController(IJobApplicationService _service) : ControllerBase
{

    // Get all jobapplications
    [HttpGet]
    public async Task<ActionResult<List<JobApplication>>> Get()
    {
        //List<JobApplication> applications = await _context.JobApplications.ToListAsync();
        var applications = await _service.GetAll();

        return Ok(applications);
    }

    // Get application by id
    [HttpGet("{id}")]
    public async Task<ActionResult<JobApplication>> Get(int id)
    {
        //JobApplication? application = await _context.JobApplications.FindAsync(id);
        var application = await _service.GetById(id);

        if (application == null)
        {
            return NotFound();
        }

        return Ok(application);
    }

    // POST: api/jobapplication
    [HttpPost]
    public async Task<ActionResult<JobApplication>> Post(JobApplication application)
    {
        // _context.JobApplications.Add(application);
        // await _context.SaveChangesAsync();
        //return CreatedAtAction("Get", new { id = application.Id }, application);
        var createdApplication = await _service.Create(application);

        return CreatedAtAction(nameof(Get), new { id = createdApplication.Id }, createdApplication);
    }

    // PUT: api/jobapplication/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, JobApplication application)
    {
        var updated = await _service.Update(id, application);

        if (!updated)
        {
            return BadRequest();
        }

        return NoContent();
        // if (id != application.Id)
        // {
        //     return BadRequest();
        // }

        // _context.Entry(application).State = EntityState.Modified;
        // await _context.SaveChangesAsync();

        // return NoContent();
    }

    //DELETE: api/jobapplication/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.Delete(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();

        // JobApplication? application = await _context.JobApplications.FindAsync(id);

        // if (application == null)
        // {
        //     return NotFound();
        // }

        // _context.JobApplications.Remove(application);
        // await _context.SaveChangesAsync();

        // return NoContent();
    }

}

