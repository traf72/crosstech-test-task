using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TestTask.DAL.Entities;
using TestTask.DAL.Entities.Identity;
using TestTask.DAL.Enums;

namespace TestTask.DAL
{
    public class TestTaskContext : IdentityDbContext<ApplicationUser, ApplicationRole, int,
        IdentityUserClaim<int>, ApplicationUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public TestTaskContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Patronymic).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Sex).HasConversion(new EnumToStringConverter<Sex>()).HasMaxLength(20);
                entity.Property(e => e.BirthDate).HasColumnType("Date");
                entity.Property(e => e.Phone).HasMaxLength(100).IsRequired();
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            });

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Patronymic).HasMaxLength(100).IsRequired();

                entity.HasMany(e => e.Roles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            modelBuilder.Entity<ApplicationRole>(entity =>
            {
                entity.HasMany(e => e.Users)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
            });

            modelBuilder.Entity<ApplicationUser>().HasData(TestTaskSeed.GetSeedData<ApplicationUser>());
            modelBuilder.Entity<ApplicationRole>().HasData(TestTaskSeed.GetSeedData<ApplicationRole>());
            modelBuilder.Entity<ApplicationUserRole>().HasData(TestTaskSeed.GetSeedData<ApplicationUserRole>());
            modelBuilder.Entity<Position>().HasData(TestTaskSeed.GetSeedData<Position>());
            modelBuilder.Entity<Employee>().HasData(TestTaskSeed.GetSeedData<Employee>());
        }
    }
}