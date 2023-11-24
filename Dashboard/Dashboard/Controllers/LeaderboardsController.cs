using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

// TODO: Leaderboard needs a group ID?

namespace Dashboard.Controllers
{
    [Route("api/leaderboards")]
    public class LeaderboardsController : BaseApiController
    {
        // GET: api/leaderboards
        [HttpGet]
        public List<Leaderboard> Get()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var leaderboards = context.Leaderboard.ToList();
                return leaderboards;
            }
        }

        // GET api/leaderboards/GUID
        [HttpGet("{leaderboardGuid}")]
        public Leaderboard Get(Guid leaderboardGuid)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var leaderboards = context.Leaderboard;
                if leaderboards.IsNullOrEmpty() {
                    return new Leaderboard();
                }

                var board = leaderboards.Find(leaderboardGuid);
                
                if (board == null) {
                    return null;
                }

                return board;
            }
        }

        // GET api/leaderboards/rank/1
        [HttpGet("rank/{position}")]
        public Leaderboard Get(int position)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var leaderboards = context.Leaderboard;
                if leaderboards.IsNullOrEmpty() {
                    return new Leaderboard();
                }

                var board = leaderboards.Where(board => board.Position == position).First();
                
                if (board == null) {
                    return null;
                }

                return board;
            }
        }

        // POST api/leaderboards
        [HttpPost]
        public IActionResult Post([FromBody] List<Leaderboard> leaderboards)
        {
            if (leaderboards == null || !leaderboards.Any())
            {
                return BadRequest("No leaderboards provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    int leaderboardCount = leaderboards.Count;

                    context.Leaderboard.AddRange(leaderboards);
                    context.SaveChanges();
                    return Ok(String.Format("Created {0} leaderboards successfully.", leaderboardCount));
                }
                catch (Exception)
                {
                    return BadRequest("Failed to create leaderboards");
                }
            }
        }

        // PUT api/leaderboards/GUID
        [HttpPut("{leaderboardGuid}")]
        public async Task<IActionResult> Put(Guid leaderboardGuid, [FromBody] Leaderboard leaderboard)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try {
                    var existingLeaderboard = context.Leaderboard.Find(leaderboardGuid);

                    if (existingLeaderboard == null) {
                        return BadRequest("Failed to find existing leaderboard with GUID: " + leaderboardGuid);
                    }

                    context.Entry(existingLeaderboard).CurrentValues.SetValues(leaderboard);
                    await context.SaveChangesAsync();

                    return Ok(new {success = "Updated leaderboard: " + leaderboardGuid});
                }
                catch (Exception e)
                {
                    return BadRequest("Failed to update existing leaderboard with GUID: " + leaderboardGuid);
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
                    User existingLeaderboard = context.Leaderboard.Find(id);

                    if (existingLeaderboard == null) {
                        return BadRequest("Failed to find existing leaderboard with GUID: " + leaderboardGuid);
                    }

                    context.Leaderboard.Remove(existingLeaderboard);
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
