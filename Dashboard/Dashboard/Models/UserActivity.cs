namespace Dashboard.Models;

public partial class UserActivity
{
    public Guid ActivityId { get; set; }

    public Guid UserId { get; set; }

    public string ActivityType { get; set; } = null!;

    public DateTime? ActivityDate { get; set; }

    public string? Description { get; set; }

    public double? Duration { get; set; }

    public double? Distance { get; set; }

    public double? CaloriesBurned { get; set; }

    public double? PointsEarned { get; set; }

    public virtual User User { get; set; } = null!;
}
