using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TestTask.DAL.Entities;
using TestTask.DAL.Enums;

namespace TestTask.DAL
{
    public class TestTaskContext : IdentityDbContext<IdentityUser<int>, IdentityRole<int>, int>
    {
        public TestTaskContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<IdentityUser<int>>().HasData(TestTaskSeed.GetSeedData<IdentityUser<int>>());
            modelBuilder.Entity<IdentityRole<int>>().HasData(TestTaskSeed.GetSeedData<IdentityRole<int>>());
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(TestTaskSeed.GetSeedData<IdentityUserRole<int>>());
            modelBuilder.Entity<Position>().HasData(TestTaskSeed.GetSeedData<Position>());
            modelBuilder.Entity<Employee>().HasData(TestTaskSeed.GetSeedData<Employee>());

            base.OnModelCreating(modelBuilder);
        }
    }
}