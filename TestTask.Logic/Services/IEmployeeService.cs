using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.DAL.Entities;

namespace TestTask.Logic.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAll();
    }
}