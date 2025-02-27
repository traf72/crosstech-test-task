﻿using Microsoft.AspNetCore.Identity;

namespace TestTask.DAL.Entities.Identity
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {
        public ApplicationUser User { get; set; }

        public ApplicationRole Role { get; set; }
    }
}