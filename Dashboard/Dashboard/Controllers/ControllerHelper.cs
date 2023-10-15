using Dashboard.Models;

namespace Dashboard.Controllers
{
    public class ControllerHelper
    {
        private readonly ILogger<ControllerHelper> log;

        public ControllerHelper(ILogger<ControllerHelper> log)
        {
            this.log = log;
        }

        // implement getting info from db as the activity repository

        public async Task<Activity> GetActivity(string activityId)
        {
            // Simulate getting an activity from the database for testing purposes
            Activity defaultActivity = new Activity { Id = 1234567, Type = "Running" };

            // Return the default activity as a completed task
            return await Task.FromResult(defaultActivity);

            //return await activityRepository.ReadyActivityById(activityId);
        }
    }
}
