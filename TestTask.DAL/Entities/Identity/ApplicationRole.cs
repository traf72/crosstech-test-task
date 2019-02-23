using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace TestTask.DAL.Entities.Identity
{
    public class ApplicationRole : IdentityRole<int>
    {
        public ICollection<ApplicationUserRole> Users { get; set; }
    }
}