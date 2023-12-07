using System.Diagnostics;

namespace Dashboard.Models.DTO
{
    public class UserActivityDto
    {
        public Guid? UserId { get; set; }

        public string ActivityType { get; set; } = null!;

        public decimal? Duration { get; set; }

        public decimal? PointsEarned { get; set; }

        public UserActivity ToPersisted()
        {
            return new UserActivity
            {
                UserId = UserId,
                ActivityType = ActivityType,
                Duration = Duration,
                PointsEarned = PointsEarned
            };
        }
    }
}
