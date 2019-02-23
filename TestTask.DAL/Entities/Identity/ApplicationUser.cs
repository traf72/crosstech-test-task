using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TestTask.DAL.Entities.Identity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public ICollection<ApplicationUserRole> Roles { get; set; }
    }
}