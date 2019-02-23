using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TestTask.DAL.Entities;
using TestTask.DAL.Enums;

namespace TestTask.DAL
{
    public static class TestTaskSeed
    {
        public static IEnumerable<T> GetSeedData<T>()
        {
            PropertyInfo property = typeof(TestTaskSeed).GetProperties(BindingFlags.Static | BindingFlags.NonPublic)
                .SingleOrDefault(x => x.PropertyType == typeof(IEnumerable<T>));
            if (property == null)
            {
                throw new InvalidOperationException($"Cannot find seed data for type {typeof(T).Name}");
            }

            return (IEnumerable<T>)property.GetValue(null);
        }

        private static IEnumerable<IdentityRole<int>> ApplicationRoles => new[]
        {
            FillRole(new IdentityRole<int> { Id = 1, Name = "Admin", ConcurrencyStamp = "93a86429-ba08-4b24-ba8d-91f04914ad60" }),
            FillRole(new IdentityRole<int> { Id = 2, Name = "User", ConcurrencyStamp = "c4d0126c-6e8c-49ee-9bf1-9ee218b014a4" }),
        };

        private static IdentityRole<int> FillRole(IdentityRole<int> role)
        {
            role.NormalizedName = role.Name.ToUpper();
            return role;
        }

        private static IEnumerable<IdentityUser<int>> ApplicationUsers => new[]
        {
            FillUser(new IdentityUser<int>
            {
                Id = 1,
                UserName = "Admin",
                Email = "admin@mail.ru",
                SecurityStamp = "1d371eb8-7517-410b-88ef-dd5ef394d08a",
                ConcurrencyStamp = "82699662-4d34-48db-9a8f-d0a2bd4d7dff",
            }),
            FillUser(new IdentityUser<int>
            {
                Id = 2,
                UserName = "User",
                Email = "user@mail.ru",
                SecurityStamp = "ca46a22d-0712-40b6-805d-f53b2f0cb10e",
                ConcurrencyStamp = "a5fc2058-cf60-405a-81f4-3ed6edcf400a",
            }),
        };

        private static IdentityUser<int> FillUser(IdentityUser<int> user)
        {
            user.PasswordHash = "AQAAAAEAACcQAAAAEJZ4S06wTDJtqQ1s4Gp2r9F5LyOShaHSFho4XVQO609+zjGpOQlkQnvYhUTVyODkCA=="; // Qw123456!
            user.NormalizedUserName = user.UserName.ToUpper();
            user.NormalizedEmail = user.Email.ToUpper();
            user.LockoutEnabled = true;
            return user;
        }

        private static IEnumerable<IdentityUserRole<int>> UserRoles => new[]
        {
            new IdentityUserRole<int> { UserId = 1, RoleId = 1 },
            new IdentityUserRole<int> { UserId = 2, RoleId = 2 },
        };

        private static IEnumerable<Position> Positions => new[]
        {
            new Position { Id = 1, Name = "Директор" },
            new Position { Id = 2, Name = "Бухгалтер" },
            new Position { Id = 3, Name = "Программист" },
            new Position { Id = 4, Name = "Системный администратор" },
            new Position { Id = 5, Name = "Специалист техподдержки" },
        };

        private static IEnumerable<Employee> Employees => new[]
        {
            new Employee
            {
                Id = 1,
                LastName = "Сурков",
                FirstName = "Анатолий",
                Patronymic = "Сергеевич",
                Sex = Sex.Male,
                BirthDate = new DateTime(1981, 10, 11),
                Phone = "+7 (926) 893-22-22",
                PositionId = 1,
            },
            new Employee
            {
                Id = 2,
                LastName = "Антипина",
                FirstName = "Галина",
                Patronymic = "Владимировна",
                Sex = Sex.Female,
                BirthDate = new DateTime(1987, 1, 25),
                Phone = "+7 (915) 743-74-27",
                PositionId = 2,
            },
            new Employee
            {
                Id = 3,
                LastName = "Селезнёв",
                FirstName = "Владимир",
                Patronymic = "Александрович",
                Sex = Sex.Male,
                BirthDate = new DateTime(1992, 11, 1),
                Phone = "+7 (918) 246-72-12",
                PositionId = 3,
            },
            new Employee
            {
                Id = 4,
                LastName = "Сухоруков",
                FirstName = "Алексей",
                Patronymic = "Романович",
                Sex = Sex.Male,
                BirthDate = new DateTime(1988, 2, 15),
                Phone = "+7 (920) 642-19-34",
                PositionId = 4,
            },
        };
    }
}