namespace Dashboard.Models
{
    public class LeaderboardUserMembership
    {
        public Guid MembershipId { get; set; }

        public Guid LeaderboardId { get; set; }

        public Guid? UserId { get; set; }

        public float? Score {  get; set; }

        public virtual Leaderboard Leaderboard { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
