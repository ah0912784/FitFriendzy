using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseApiController
    {
        private readonly ILogger<UsersController> log;

        public UsersController(ILogger<UsersController> log)
        {
            this.log = log;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Route("[action]")]
        public List<User> GetAll()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var users = context.Users.ToList();
                return users;
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(Guid id)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var users = context.Users;
                if (users.IsNullOrEmpty()) {
                    return new User();
                }

                var user = context.Users.Find(id);
                
                if (user == null) {
                    return null;
                }

                return user;
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post([FromBody] List<User> users)
        {
            if (users == null || !users.Any())
            {
                return BadRequest("No users provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    int userCount = users.Count;

                    context.Users.AddRange(users);
                    context.SaveChanges();
                    return Ok(String.Format("Created {0} users successfully.", userCount));
                }
                catch (Exception)
                {
                    return BadRequest("Failed to create users");
                }
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] User user)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    User existingUser = context.Users.Find(id);

                    if (existingUser == null) {
                        return BadRequest("Failed to find existing user with GUID: " + id);
                    }

                    context.Entry(existingUser).CurrentValues.SetValues(user);
                    await context.SaveChangesAsync();

                    return Ok(new {success = "Updated user: " + id});
                }
                catch (Exception e)
                {
                    return BadRequest("Failed to update existing user with GUID: " + id);
                }
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    User existingUser = context.Users.Find(id);

                    if (existingUser == null) {
                        return BadRequest("Failed to find existing user with GUID: " + id);
                    }

                    context.Users.Remove(existingUser);
                    await context.SaveChangesAsync();

                    return Ok(new {success = "Deleted user: " + id});
                }
                catch (Exception e)
                {
                    return BadRequest("Failed to deleted existing user with GUID: " + id);
                }
            }
        }
    }
}
