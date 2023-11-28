using Microsoft.IdentityModel.Tokens;

namespace Dashboard.Models;

public partial class Group
{
    public Guid? GroupId { get; set; }

    public Guid GroupLeaderId { get; set; }

    public string GroupName { get; set; } = null!;

    public virtual ICollection<UserGroupMembership> UserGroupMemberships { get; set; } = new List<UserGroupMembership>();

    public UserGroupMembership ToNewGroupMembership()
    {
        return new UserGroupMembership
        {
            MembershipId = Guid.NewGuid(),
            UserId = GroupLeaderId,
            GroupId = GroupId,
            IsAdmin = true
        };
    }
}
