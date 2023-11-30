using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
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
                    return BadRequest($"Failed to get group groups for user: {userId}: {ex}");
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

        // GET api/<UserController>/get/all/groups/{userId}
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
                    return BadRequest($"Failed to get group groups for {userId}: {ex}");
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

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
