namespace Dashboard.Models
{
    public class LeaderboardEntry
    {
        public int Position { get; set; }
        public User User { get; set; } = null!;
        public float? Score { get; set; }
    }
}
