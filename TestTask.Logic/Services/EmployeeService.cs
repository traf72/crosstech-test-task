using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await _dbContext.Employees.Include(e => e.Position).ToListAsync();
        }
    }
}