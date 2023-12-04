using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    if (Guid.Empty == groupId)
                    {
                        return BadRequest("Empty group id");
                    }

                    var leaderboard = await context.Leaderboards
                        .Include(l => l.LeaderboardUserMemberships)
                        .ThenInclude(membership => membership.User)
                        .FirstOrDefaultAsync(l => l.GroupId == groupId);

                    if (leaderboard == null)
                    {
                        return NotFound("Leaderboard not found");
                    }

                    var leaderboardEntries = leaderboard.LeaderboardUserMemberships
                        .OrderByDescending(membership => membership.Score)
                        .Select((membership, index) => new LeaderboardEntry
                        {
                            Position = index + 1,
                            User = membership.User,
                            Score = membership.Score
                        })
                        .ToList();

                    return Ok(leaderboardEntries);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get leaderboard entries: {ex}");
                }
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
