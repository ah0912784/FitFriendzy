using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger<ActivitiesController> log;

        public ActivitiesController(ILogger<ActivitiesController> log)
        {
            this.log = log;
        }

        // GET api/<ActivitiesController>/get/all
        [HttpGet]
        [Route("get/all/{userId}")]
        public async Task<IActionResult> GetAllUserActivites(Guid userId)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    // retrieve groups based on the group IDs obtained
                    var activities = await context.UserActivities
                        .Where(a => a.UserId == userId)
                        .ToListAsync();

                    return Ok(activities);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get activities for user - {userId}: {ex}");
                }
            }
        }

        // POST api/<ActivitiesController>/add/new
        [HttpPost]
        [Route("add/new")]
        public async Task<IActionResult> CreateNewUser(UserActivityDto newActivity)
        {
            if (newActivity == null)
            {
                return BadRequest("No activity info provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var activity = newActivity.ToPersisted();
                    activity.ActivityId = Guid.NewGuid();

                    // Add new activity
                    await context.UserActivities.AddAsync(activity);

                    // Fetch leaderboardUserMemberships and update scores
                    var leaderboardUserMemberships = await context.LeaderboardUserMemberships
                        .Where(l => l.UserId == activity.UserId)
                        .ToListAsync();

                    foreach (var membership in leaderboardUserMemberships)
                    {
                        membership.Score += activity.PointsEarned;
                        context.Entry(membership).State = EntityState.Modified;
                    }

                    // Fetch any current goals that the user has
                    var currentUnixTimestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                    var userGoals = await context.UserGoals
                        .Where(ug => ug.UserId == activity.UserId && ug.EndTime >= currentUnixTimestamp)
                        .ToListAsync();

                    foreach (var userGoal in userGoals)
                    {
                        if (activity.PointsEarned == null) throw new Exception("Null points earned");

                        userGoal.CurrentPoints += (int)activity.PointsEarned;

                        // Mark the entity as modified to save changes
                        context.Entry(userGoal).State = EntityState.Modified;
                    }

                    await context.SaveChangesAsync();

                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to add activity: {ex}");
                }
            }
        }
    }
}
