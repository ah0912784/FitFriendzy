using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Dashboard.Controllers
{
    [Route("api/users")]
    public class UsersController : BaseApiController
    {
        // GET: api/<UserController>
        [HttpGet]
        public List<User> Get()
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var users = context.Users.ToList();
                return users;
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            using (var context = new FitFriendzyDatabaseContext())
            {
                var users = context.Users;
                if (users.IsNullOrEmpty()) {
                    return new User();
                }

                var user = context.Users.Single(user => user.UserId.Equals(id));
                return user;
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
