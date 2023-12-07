namespace Dashboard.Models
{
    public class LeaderboardEntry
    {
        public int Position { get; set; }
        public string UserName { get; set; } = null!;
        public decimal? Score { get; set; }
    }
}
