namespace Dashboard.Models
{
    public class LeaderboardUserMembership
    {
        public Guid MembershipId { get; set; }

        public Guid LeaderboardId { get; set; }

        public Guid? UserId { get; set; }

        public string UserName { get; set; } = null!;

        public decimal? Score {  get; set; }

        public virtual Leaderboard Leaderboard { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
