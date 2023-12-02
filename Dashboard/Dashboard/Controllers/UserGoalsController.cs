using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGoalsController : ControllerBase
    {
        private readonly ILogger<UserGoalsController> log;

        public UserGoalsController(ILogger<UserGoalsController> log)
        {
            this.log = log;
        }

        [HttpGet]
        [Route("get/latest/user/{userId}")]
        public UserGoal GetLatestGoal(Guid userId)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                // Get all goals for the specified user
                var goals = context.UserGoals.Where(ug => ug.UserId == userId);

                // Check if there are no goals for the user
                if (!goals.Any())
                {
                    return null;
                }

                // Order the goals by startTime in descending order and get the first one
                var latestGoal = goals.OrderByDescending(ug => ug.StartTime).FirstOrDefault();

                return latestGoal;
            }
        }

        // POST api/<UserController>/create/new
        [HttpPost]
        [Route("create/new")]
        public async Task<IActionResult> CreateNewGoal(UserGoalDto newGoal)
        {
            if (newGoal == null)
            {
                return BadRequest("No goal info provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var goal = newGoal.ToPersisted();
                    goal.GoalId = Guid.NewGuid();
                    await context.UserGoals.AddAsync(goal);
                    var created = await context.SaveChangesAsync();
                    if( created > 0 )
                    {
                        return Ok();
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to create goal: {ex}");
                }

                return BadRequest("Error");
            }
        }
    }
}
