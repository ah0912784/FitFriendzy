using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>/<action>
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
