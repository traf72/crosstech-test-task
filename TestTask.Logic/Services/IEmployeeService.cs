using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL.Entities;

namespace TestTask.Logic.Services
{
    public interface IEmployeeService
    {
        IQueryable<Employee> QueryAll(bool includePosition = true);

        Task<Employee> Find(int id, bool includePosition = true);

        Task<Employee> CreateOrEdit(Employee employee);

        Task Delete(int id);
    }
}