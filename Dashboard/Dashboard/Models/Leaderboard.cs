namespace Dashboard.Models;

public partial class Leaderboard
{
    public Guid LeaderboardId { get; set; }

    public Guid UserId { get; set; }

    public double? TotalPointsEarned { get; set; }

    public int? Position { get; set; }

    public virtual User User { get; set; } = null!;
}
