using Microsoft.EntityFrameworkCore;

namespace Dashboard.Models;

public partial class FitFriendzyDatabaseContext : DbContext
{
    public FitFriendzyDatabaseContext()
    {
    }

    public FitFriendzyDatabaseContext(DbContextOptions<FitFriendzyDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<Leaderboard> Leaderboards { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserActivity> UserActivities { get; set; }

    public virtual DbSet<UserGoal> UserGoals { get; set; }

    public virtual DbSet<UserGroupMembership> UserGroupMemberships { get; set; }

    public virtual DbSet<UserSetting> UserSettings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // add IConfigurationRoot  to get connection string 
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("FitFriendzy"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Group>(entity =>
        {
            entity.ToTable("Group");

            entity.Property(e => e.GroupId)
                .ValueGeneratedNever()
                .HasColumnName("group_id");
            entity.Property(e => e.GroupLeaderId).HasColumnName("group_leader_id");
            entity.Property(e => e.GroupName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("group_name");
        });

        modelBuilder.Entity<Leaderboard>(entity =>
        {
            entity.ToTable("Leaderboard");

            entity.Property(e => e.LeaderboardId)
                .ValueGeneratedNever()
                .HasColumnName("leaderboard_id");
            entity.Property(e => e.Position).HasColumnName("position");
            entity.Property(e => e.TotalPointsEarned).HasColumnName("total_points_earned");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Leaderboards)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Leaderboard_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");
            entity.Property(e => e.UserDisplayName)
                .HasMaxLength(50)
                .HasColumnName("user_display_name");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("user_name");
        });

        modelBuilder.Entity<UserActivity>(entity =>
        {
            entity.HasKey(e => e.ActivityId);

            entity.ToTable("UserActivity");

            entity.Property(e => e.ActivityId)
                .ValueGeneratedNever()
                .HasColumnName("activity_id");
            entity.Property(e => e.ActivityDate)
                .HasColumnType("date")
                .HasColumnName("activity_date");
            entity.Property(e => e.ActivityType)
                .HasMaxLength(50)
                .HasColumnName("activity_type");
            entity.Property(e => e.CaloriesBurned).HasColumnName("calories_burned");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Distance).HasColumnName("distance");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.PointsEarned).HasColumnName("points_earned");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserActivities)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserActivity_User");
        });

        modelBuilder.Entity<UserGoal>(entity =>
        {
            entity.HasKey(e => e.GoalId).HasName("PK__UserGoal__76679A2449647CC7");

            entity.Property(e => e.GoalId)
                .ValueGeneratedNever()
                .HasColumnName("goal_id");
            entity.Property(e => e.CurrentPoints).HasColumnName("current_points");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.TargetPoints).HasColumnName("target_points");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<UserGroupMembership>(entity =>
        {
            entity.HasKey(e => e.MembershipId);

            entity.ToTable("UserGroupMembership");

            entity.Property(e => e.MembershipId)
                .ValueGeneratedNever()
                .HasColumnName("membership_id");
            entity.Property(e => e.GroupId).HasColumnName("group_id");
            entity.Property(e => e.IsAdmin).HasColumnName("is_admin");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Group).WithMany(p => p.UserGroupMemberships)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserGroupMembership_Group");

            entity.HasOne(d => d.User).WithMany(p => p.UserGroupMemberships)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserGroupMembership_User");
        });

        modelBuilder.Entity<UserSetting>(entity =>
        {
            entity.HasKey(e => e.SettingsId);

            entity.Property(e => e.SettingsId)
                .ValueGeneratedNever()
                .HasColumnName("settings_id");
            entity.Property(e => e.NotificationPref)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("notification_pref");
            entity.Property(e => e.Private).HasColumnName("private");
            entity.Property(e => e.ThemePref)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("theme_pref");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserSettings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSettings_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
