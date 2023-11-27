namespace Dashboard.Models.DTO
{
    public class UserDto
    {
        public Guid? UserId { get; set; }

        public string? UserDisplayName { get; set; }

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public User ToPersisted()
        {
            return new User
            {
                UserId = UserId,
                UserDisplayName = UserDisplayName,
                UserName = UserName,
                Password = Password,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                PhoneNumber = PhoneNumber
            };
        }
    }
}
