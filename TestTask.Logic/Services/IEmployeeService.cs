using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL.Entities;

namespace TestTask.Logic.Services
{
    public interface IEmployeeService
    {
        IQueryable<Employee> QueryAll();

        Task<Employee> Find(int id);
    }
}