namespace Dashboard.Models;

public partial class UserActivity
{
    public Guid ActivityId { get; set; }

    public Guid? UserId { get; set; }

    public string ActivityType { get; set; } = null!;

    public DateTime? ActivityDate { get; set; }

    public string? Description { get; set; }

    public decimal? Duration { get; set; }

    public decimal? Distance { get; set; }

    public decimal? CaloriesBurned { get; set; }

    public decimal? PointsEarned { get; set; }

    public virtual User User { get; set; } = null!;
}
