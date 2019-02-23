using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL.Entities.Identity;

namespace TestTask.Logic.Services
{
    public interface IUserService
    {
        IQueryable<ApplicationUser> QueryUsers(bool includeRoles = true);

        Task<ApplicationUser> FindByName(string name, bool includeRoles = true);
    }
}