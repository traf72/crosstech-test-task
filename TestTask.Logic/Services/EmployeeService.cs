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

        public IQueryable<Employee> QueryAll(bool includePosition = true)
        {
            IQueryable<Employee> employees = _dbContext.Employees;
            if (includePosition)
            {
                employees = employees.Include(e => e.Position);
            }

            return employees;
        }

        public async Task<Employee> Find(int id, bool includePosition = true)
        {
            return await QueryAll(includePosition).SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> CreateOrEdit(Employee employee)
        {
            if (employee.Id == 0)
            {
                _dbContext.Employees.Add(employee);
            }

            await _dbContext.SaveChangesAsync();
            return employee;
        }

        public async Task Delete(int id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee != null)
            {
                _dbContext.Employees.Remove(employee);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}