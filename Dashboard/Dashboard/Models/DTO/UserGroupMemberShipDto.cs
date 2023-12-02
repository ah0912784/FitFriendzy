namespace Dashboard.Models.DTO
{
    public class UserGroupMemberShipDto
    {
        public Guid? UserId { get; set; }

        public Guid? GroupId { get; set; }

        public bool IsAdmin { get; set; }

        public UserGroupMembership ToPersisted()
        {
            return new UserGroupMembership
            {
                UserId = UserId,
                GroupId = GroupId,
                IsAdmin = IsAdmin
            };
        }
    }
}
