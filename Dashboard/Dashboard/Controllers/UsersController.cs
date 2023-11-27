using Dashboard.Models;
using Dashboard.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Web.Http.Results;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> log;

        public UsersController(ILogger<UsersController> log)
        {
            this.log = log;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAll()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var entities = await context.Users.ToListAsync();
                    var users = ConvertToDtoList(entities);
                    return Ok(users);
                } catch(Exception e)
                {
                    return BadRequest("Failed to get users: " + e);
                }
            }
        }

        public List<UserDto> ConvertToDtoList(List<User> users)
        {
            // Map User objects to UserDto objects
            List<UserDto> userDtos = users
                .Select(u => new UserDto
                {
                    UserId = u.UserId,
                    UserDisplayName = u.UserDisplayName,
                    UserName = u.UserName,
                    Password = u.Password,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PhoneNumber = Convert.ToString(u.PhoneNumber)
                })
                .ToList();

            return userDtos;
        }

        // GET api/<UserController>/5
        //[HttpGet("{id}")]
        //public User Get(Guid id)
        //{
        //    using (var context = new FitFriendzyDatabaseContext())
        //    {
        //        var users = context.Users;
        //        if (users.IsNullOrEmpty()) {
        //            return new User();
        //        }

        //        var user = context.Users.Find(id);
                
        //        if (user == null) {
        //            return null;
        //        }

        //        return user;
        //    }
        //}

        // POST api/<UserController>
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> CreateNewUser(UserDto newUser)
        {
            if (newUser == null)
            {
                return BadRequest("No user info provided");
            }

            using (var context = new FitFriendzyDatabaseContext())
            {
                try
                {
                    var user = newUser.ToPersisted();
                    user.UserId = Guid.NewGuid();
                    await context.Users.AddAsync(user);
                    var created = await context.SaveChangesAsync();
                    if( created > 0 )
                    {
                        return Ok();
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to create user: {ex}");
                }

                return BadRequest("Error");
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
