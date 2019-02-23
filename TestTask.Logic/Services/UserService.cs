using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL;
using TestTask.DAL.Entities.Identity;

namespace TestTask.Logic.Services
{
    public class UserService : IUserService
    {
        private readonly TestTaskContext _dbContext;

        public UserService(TestTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ApplicationUser> QueryUsers(bool includeRoles = true)
        {
            IQueryable<ApplicationUser> users = _dbContext.Users;
            if (includeRoles)
            {
                users = users.Include(u => u.Roles).ThenInclude(r => r.Role);
            }

            return users;
        }

        public async Task<ApplicationUser> FindByName(string name, bool includeRoles = true)
        {
            return await QueryUsers(includeRoles).SingleOrDefaultAsync(u => u.NormalizedUserName == name.ToUpper());
        }
    }
}