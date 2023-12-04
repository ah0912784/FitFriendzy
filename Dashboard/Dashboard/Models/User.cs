using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Runtime.CompilerServices;

namespace Dashboard.Models
{
    public class User
    {
        public Guid? UserId { get; set; }
        public string? UserDisplayName { get; set; }

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; }

        public virtual ICollection<LeaderboardUserMembership> LeaderboardUserMemberships { get; set; } = new List<LeaderboardUserMembership>();

        public virtual ICollection<UserActivity> UserActivities { get; set; } = new List<UserActivity>();

        public virtual ICollection<UserGroupMembership> UserGroupMemberships { get; set; } = new List<UserGroupMembership>();

        public virtual ICollection<UserSetting> UserSettings { get; set; } = new List<UserSetting>();
    }
}
