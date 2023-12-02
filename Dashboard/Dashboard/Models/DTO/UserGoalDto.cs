namespace Dashboard.Models.DTO
{
    public class UserGoalDto
    {
        public Guid UserId { get; set; }
        public long StartTime { get; set; }
        public long EndTime { get; set; }
        public int TargetPoints { get; set; }
        public int CurrentPoints { get; set; }

        public UserGoal ToPersisted()
        {
            return new UserGoal 
            { 
                UserId = UserId,
                StartTime = StartTime,
                EndTime = EndTime,
                TargetPoints = TargetPoints,
                CurrentPoints = CurrentPoints
            };
        }
    }
}
