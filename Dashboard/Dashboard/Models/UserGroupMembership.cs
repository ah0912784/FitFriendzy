namespace Dashboard.Models;

public partial class UserGroupMembership
{
    public Guid MembershipId { get; set; }

    public Guid UserId { get; set; }

    public Guid GroupId { get; set; }

    public bool IsAdmin { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
