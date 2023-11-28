using Microsoft.IdentityModel.Tokens;

namespace Dashboard.Models.DTO
{
    public class GroupDto
    {
        public Guid? GroupId { get; set; }

        public string GroupLeaderId { get; set; } = null!;

        public string GroupName { get; set; } = null!;

        public Group ToPersisted()
        {
            return new Group { 
                GroupId = GroupId != null ? GroupId : Guid.NewGuid(),
                GroupLeaderId = Guid.Parse(GroupLeaderId),
                GroupName = GroupName,
            };
        }

    }
}
