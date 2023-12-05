using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.RegularExpressions;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        // GET api/<UserController>/get/all
        [HttpGet]
        [Route("get/all")]
        public async Task<IActionResult> GetAllGroups()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    // retrieve groups based on the group IDs obtained
                    var groups = await context.Groups.ToListAsync();

                    return Ok(groups);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get group groups: {ex}");
                }
            }
        }

        // GET api/<UserController>/get/all/other
        [HttpGet]
        [Route("get/all/other/{userId}")]
        public async Task<IActionResult> GetAllOtherGroupsByUserId(Guid userId)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    if(Guid.Empty == userId)
                    {
                        BadRequest("Empty user id");
                    }

                    // Retrieve the list of group IDs the user is associated with
                    var groupIdsUserIsIn = await context.UserGroupMemberships
                        .Where(membership => membership.UserId == userId)
                        .Select(membership => membership.GroupId)
                        .ToListAsync();

                    // Retrieve the list of groups where the user is not a member
                    var groupsUserIsNotIn = await context.Groups
                        .Where(group => !groupIdsUserIsIn.Contains(group.GroupId))
                        .ToListAsync();

                    return Ok(groupsUserIsNotIn);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get other groups: {ex}");
                }
            }
        }

        // GET api/<UserController>/get/all/{userId}
        [HttpGet]
        [Route("get/all/{userId}")]
        public async Task<IActionResult> GetAllGroupsByUserId(Guid userId)
        {
            if (userId.Equals(""))
            {
                return BadRequest("No user id provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    // retrieve group IDs from the user's group memberships
                    var groupIds = await context.UserGroupMemberships
                        .Where(x => x.UserId == userId)
                        .Select(x => x.GroupId)
                        .ToListAsync();

                    // retrieve groups based on the group IDs obtained
                    var groups = await context.Groups
                        .Where(g => groupIds.Contains(g.GroupId))
                        .ToListAsync();

                    return Ok(groups);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get groups for user: {userId}: {ex}");
                }
            }
        }

        // GET api/<UserController>/get/all/users/{groupId}
        [HttpGet]
        [Route("get/all/users/{groupId}")]
        public async Task<IActionResult> GetAllUsersByGroupId(Guid groupId)
        {
            if (groupId.Equals(""))
            {
                return BadRequest("No user id provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var userIdsInGroup = await context.UserGroupMemberships
                        .Where(membership => membership.GroupId == groupId)
                        .Select(membership => membership.UserId)
                        .ToListAsync();

                    if (userIdsInGroup.Any())
                    {
                        var usersInGroup = await context.Users
                            .Where(user => userIdsInGroup.Contains(user.UserId))
                            .ToListAsync();

                        if (usersInGroup.Any())
                        {
                            return Ok(usersInGroup);
                        }
                        else
                        {
                            return BadRequest($"Failed to get users in group for group: {groupId}");
                        }
                    }
                    else
                    {
                        return BadRequest($"Failed to get user ids from group for group: {groupId}");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get users for group: {groupId}: {ex}");
                }
            }
        }

        // GET api/<UserController>/get/{userId}
        [HttpGet]
        [Route("get/{userId}")]
        public async Task<IActionResult> GetGroupById(Guid userId)
        {
            if (userId.Equals(""))
            {
                return BadRequest("No user id provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    // retrieve groups based on the group IDs obtained
                    var group = await context.Groups.FindAsync(userId);

                    return Ok(group);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to get group for {userId}: {ex}");
                }
            }
        }

        // POST api/<UserController>/create/new
        [HttpPost]
        [Route("create/new")]
        public async Task<IActionResult> CreateNewGroup(GroupDto newGroup)
        {
            if (newGroup == null)
            {
                return BadRequest("No group info provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var group = newGroup.ToPersisted();
                    await context.Groups.AddAsync(group);

                    var groupMembership = group.ToNewGroupMembership();
                    await context.UserGroupMemberships.AddAsync(groupMembership);

                    var leaderboard = new Leaderboard()
                    {
                        LeaderboardId = Guid.NewGuid(),
                        GroupId = group.GroupId
                    };
                    await context.Leaderboards.AddAsync(leaderboard);

                    var userDisplayName = await context.Users
                        .Where(u => u.UserId == group.GroupLeaderId)
                        .Select(u => u.UserDisplayName).FirstOrDefaultAsync();

                    var leaderboardUserMembership = leaderboard.ToNewLeaderboardUserMembership(group.GroupLeaderId, userDisplayName);
                    await context.LeaderboardUserMemberships.AddAsync(leaderboardUserMembership);

                    var created = await context.SaveChangesAsync();
                    if (created > 0)
                    {
                        return Ok();
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to create group: {ex}");
                }

                return BadRequest("Error");
            }
        }

        // POST api/<UserController>/join/new
        [HttpPost]
        [Route("join/new")]
        public async Task<IActionResult> JoinNewGroup(UserGroupMemberShipDto membership)
        {
            if (membership == null)
            {
                return BadRequest("No group info provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var userGroupMembership = membership.ToPersisted();
                    userGroupMembership.MembershipId = Guid.NewGuid();

                    await context.UserGroupMemberships.AddAsync(userGroupMembership);

                    var leaderboard = GetGroupLeaderboardById(membership.GroupId);
                    if(null != leaderboard)
                    {
                        var userDisplayName = await context.Users
                            .Where(u => u.UserId == userGroupMembership.UserId)
                            .Select(u => u.UserDisplayName).FirstOrDefaultAsync();

                        var leaderboardUserMembership = leaderboard.ToNewLeaderboardUserMembership(membership.UserId, userDisplayName);
                        await context.LeaderboardUserMemberships.AddAsync(leaderboardUserMembership);
                    }

                    var created = await context.SaveChangesAsync();
                    if (created > 0)
                    {
                        return Ok();
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to create group: {ex}");
                }

                return BadRequest("Error");
            }
        }

        public Leaderboard GetGroupLeaderboardById(Guid? groupId)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var leaderboard = context.Leaderboards
                        .FirstOrDefault(l => l.GroupId == groupId);
                    return leaderboard;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
    }
}
