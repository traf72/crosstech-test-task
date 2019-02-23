using Mapster;
using TestTask.DAL.Entities.Identity;
using TestTask.Web.Model;

namespace TestTask.Web
{
    public static class MappingConfig
    {
        public static void Init()
        {
            TypeAdapterConfig<ApplicationUser, UserVm>
                .NewConfig()
                .Ignore(x => x.Roles);
        }
    }
}