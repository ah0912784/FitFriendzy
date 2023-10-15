using Dashboard.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger<ActivitiesController> log;

        public ActivitiesController(ILogger<ActivitiesController> log)
        {
            this.log = log;
        }


        [HttpGet]
        [Route("[action]/{activityId:int}")]
        //[Authorize]
        public IActionResult GetActivity(int activityId)
        {
            // In a real application, you would fetch the 'Activity' from your data source
            // For demonstration purposes, we'll create a sample 'Activity' object
            
            var activity = new Activity
            {
                Id = activityId,
                Type = "Running",
                // Set other properties as needed
            };

            return Ok(activity); // Returns a 200 OK response with the 'Activity' object
        }
    }
}
