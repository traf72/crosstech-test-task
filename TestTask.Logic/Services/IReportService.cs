using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestTask.Logic.Services
{
    public interface IReportService
    {
        Task<IDictionary<string, int>> EmplyeesCountBySex();

        Task<IDictionary<string, int>> EmplyeesCountByDecades();
    }
}