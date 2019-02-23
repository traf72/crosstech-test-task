using System;
using TestTask.DAL.Enums;

namespace TestTask.DAL.Entities
{
    public class Employee : Entity<int>
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Patronymic { get; set; }

        public Sex Sex { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public int PositionId { get; set; }

        public Position Position { get; set; }
    }
}