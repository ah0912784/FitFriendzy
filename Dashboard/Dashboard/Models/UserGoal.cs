using System;
using System.Collections.Generic;

namespace Dashboard.Models;

public partial class UserGoal
{
    public Guid GoalId { get; set; }

    public Guid UserId { get; set; }

    public long StartTime { get; set; }

    public long EndTime { get; set; }

    public int TargetPoints { get; set; }

    public int CurrentPoints { get; set; }
}
