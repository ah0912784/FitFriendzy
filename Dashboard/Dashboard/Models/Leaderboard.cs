namespace Dashboard.Models;

public partial class Leaderboard
{
    public Guid LeaderboardId { get; set; }
    public Guid? GroupId { get; set; }

    public virtual Group Group { get; set; } = null!;
    public virtual ICollection<LeaderboardUserMembership> LeaderboardUserMemberships { get; set; } = new List<LeaderboardUserMembership>();

    public LeaderboardUserMembership ToNewLeaderboardUserMembership(Guid? UserId)
    {
        return new LeaderboardUserMembership
        {
            MembershipId = Guid.NewGuid(),
            LeaderboardId = LeaderboardId,
            UserId = UserId,
            Score = 0
        };
    }
}
