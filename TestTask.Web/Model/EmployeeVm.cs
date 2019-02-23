using System;

namespace TestTask.Web.Model
{
    public class EmployeeVm
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Patronymic { get; set; }

        public string Sex { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public CatalogVm<int> Position { get; set; }
    }
}