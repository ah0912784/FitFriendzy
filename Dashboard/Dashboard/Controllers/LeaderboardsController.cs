using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.IdentityModel.Tokens;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardsController : ControllerBase
    {
        // GET: api/<controller>/get/<groupId>
        [HttpGet]
        [Route("get/entries/{groupId}")]
        public async Task<IActionResult> GetEntriesByGroupId(Guid groupId)
        {
            try
            {
                if (Guid.Empty == groupId)
                {
                    return BadRequest("Empty group id");
                }

                using (var context = new FitFriendzyDatabaseContext())
                {
                    var retval = new List<LeaderboardEntry>();
                    var leaderboard = await context.Leaderboards
                        .FirstOrDefaultAsync(l => l.GroupId == groupId);

                    if (leaderboard == null)
                    {
                        return NotFound("Leaderboard not found");
                    }

                    var leaderboardUserMemberships = await context.LeaderboardUserMemberships
                        .Where(membership => membership.LeaderboardId == leaderboard.LeaderboardId)
                        .OrderByDescending(membership => membership.Score)
                        .ToListAsync();

                    var index = 1;
                    leaderboardUserMemberships.ForEach((membership) =>
                    {
                        retval.Add(new LeaderboardEntry
                        {
                            Position = index++,
                            UserName = membership.UserName,
                            Score = membership.Score,
                        });
                    });

                    return Ok(retval);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to get leaderboard entries. EX: " + ex);
            }
        }

        // DELETE api/leaderboards/5
        [HttpDelete("{leaderboardGuid}")]
        public async Task<IActionResult> Delete(Guid leaderboardGuid)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    Leaderboard existingLeaderboard = context.Leaderboards.Find(leaderboardGuid);

                    if (existingLeaderboard == null) {
                        return BadRequest("Failed to find existing leaderboard with GUID: " + leaderboardGuid);
                    }

                    context.Leaderboards.Remove(existingLeaderboard);
                    await context.SaveChangesAsync();

                    return Ok(new {success = "Deleted leaderboard: " + leaderboardGuid});
                }
                catch (Exception e)
                {
                    return BadRequest("Failed to deleted existing leaderboard with GUID: " + leaderboardGuid);
                }
            }
        }
    }
}
