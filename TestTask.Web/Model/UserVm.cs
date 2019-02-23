using System.Collections.Generic;

namespace TestTask.Web.Model
{
    public class UserVm
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}