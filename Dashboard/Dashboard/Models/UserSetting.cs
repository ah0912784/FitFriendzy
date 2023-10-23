namespace Dashboard.Models;

public partial class UserSetting
{
    public Guid SettingsId { get; set; }

    public Guid UserId { get; set; }

    public bool Private { get; set; }

    public string? NotificationPref { get; set; }

    public string? ThemePref { get; set; }

    public virtual User User { get; set; } = null!;
}
