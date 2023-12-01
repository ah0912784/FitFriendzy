using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserActivityController : ControllerBase
    {
        private readonly ILogger<UserActivityController> log;

        public UserActivityController(ILogger<UserActivityController> log)
        {
            this.log = log;
        }

        // GET: api/useractivity
        [HttpGet]
        [Route("get/all")]
        public List<UserActivity> GetAll()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var activities = context.UserActivities.ToList();
                return activities;
            }
        }

        // GET api/useractivity/userGuid
        [HttpGet("{userGuid}")]
        public List<UserActivity> Get(Guid userGuid)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var activities = context.UserActivities;

                var userActivities = activities.Where(a => a.UserId == userGuid).ToList();
                
                if (userActivities == null) {
                    return null;
                }

                return userActivities;
            }
        }

        // POST api/useractivity
        [HttpPost]
        public IActionResult Post([FromBody] List<UserActivity> activities)
        {
            if (activities == null || !activities.Any())
            {
                return BadRequest("No activities provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    int activityCount = activities.Count;

                    context.UserActivities.AddRange(activities);
                    context.SaveChanges();
                    return Ok(String.Format("Created {0} activities successfully.", activityCount));
                }
                catch (Exception)
                {
                    return BadRequest("Failed to create activities");
                }
            }
        }

        // PUT api/useractivity/{userGuid}/{activityGuid}
        [HttpPut("{userGuid}/{activityGuid}")]
        public async Task<IActionResult> Put(Guid userGuid, Guid activityGuid, [FromBody] UserActivity userActivity)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try {
                    var existingUserActivity = context.UserActivities.Find(userGuid, activityGuid);

                    if (existingUserActivity == null) {
                        return BadRequest(String.Format("Failed to find existing activity with userGuid {0} and acitivtyGuid {1}", userGuid, activityGuid));
                    }

                    context.Entry(existingUserActivity).CurrentValues.SetValues(userActivity);
                    await context.SaveChangesAsync();

                    return Ok(new {success = String.Format("Updated userGuid {0} and activityGuid {1}: ", userGuid, activityGuid)});
                }
                catch (Exception)
                {
                    return BadRequest(String.Format("Failed to update existing activity with userGuid {0} and activityGuid {1}: ", userGuid, activityGuid));
                }

            }
        }

        // DELETE api/useractivity/{userGuid}/{activityGuid}
        [HttpDelete("{userGuid}/{activityGuid}")]
        public async Task<IActionResult> Delete(Guid userGuid, Guid activityGuid)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var existingUserActivity = context.UserActivities.Find(userGuid, activityGuid);

                    if (existingUserActivity == null) {
                        return BadRequest(String.Format("Failed to find existing activity with userGuid {0} and acitivtyGuid {1}", userGuid, activityGuid));
                    }

                    context.UserActivities.Remove(existingUserActivity);
                    await context.SaveChangesAsync();

                    return Ok(new {success = String.Format("Deleted activity with userGuid {0} and activityGuid {1}: ", userGuid, activityGuid)});
                }
                catch (Exception)
                {
                    return BadRequest(String.Format("Failed to delete existing activity with userGuid {0} and activityGuid {1}: ", userGuid, activityGuid));
                }
            }
        }
    }
}
