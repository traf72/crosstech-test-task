using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL;
using TestTask.DAL.Entities;

namespace TestTask.Logic.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly TestTaskContext _dbContext;

        public EmployeeService(TestTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Employee> QueryAll()
        {
            return _dbContext.Employees.Include(e => e.Position);
        }

        public async Task<Employee> Find(int id)
        {
            return await QueryAll().SingleOrDefaultAsync(e => e.Id == id);
        }
    }
}