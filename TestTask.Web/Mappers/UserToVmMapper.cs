using System.Linq;
using TestTask.Common.Mappers;
using TestTask.DAL.Entities.Identity;
using TestTask.Web.Model;

namespace TestTask.Web.Mappers
{
    public class UserToVmMapper : AutoMapper<ApplicationUser, UserVm>
    {
        public override UserVm Map(ApplicationUser input, UserVm to)
        {
            var result = base.Map(input, to);
            if (result == null)
            {
                return null;
            }

            result.Roles = input.Roles.Select(r => r.Role.Name);
            return result;
        }
    } 
}