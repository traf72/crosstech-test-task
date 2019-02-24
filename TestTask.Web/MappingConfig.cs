using Mapster;
using TestTask.DAL.Entities;
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
                .Ignore(dest => dest.Roles);

            TypeAdapterConfig<Employee, EmployeeVm>
                .NewConfig()
                .Map(dest => dest.Position, src => src.Position, src => src.Position != null)
                .Map(dest => dest.Position, src => new Position { Id = src.PositionId }, src => src.Position == null);

            TypeAdapterConfig<EmployeeVm, Employee>
                .NewConfig()
                .Ignore(dest => dest.Position)
                .Map(dest => dest.PositionId, src => src.Position.Id);
        }
    }
}