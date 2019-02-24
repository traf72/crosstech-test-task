using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL;

namespace TestTask.Logic.Services
{
    public class ReportService : IReportService
    {
        private readonly TestTaskContext _dbContext;

        public ReportService(TestTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IDictionary<string, int>> EmplyeesCountBySex()
        {
            var result =
                from e in _dbContext.Employees
                group e by e.Sex into g
                select new
                {
                    Sex = g.Key,
                    Count = g.Count(),
                };

            return await result.ToDictionaryAsync(x => x.Sex.ToString(), x => x.Count);
        }

        public async Task<IDictionary<string, int>> EmplyeesCountByDecades()
        {
            var result =
                from e in _dbContext.Employees
                group e by e.BirthDate.Year / 10 into g
                select new
                {
                    Period = $"{g.Key}0 - {g.Key}9",
                    Count = g.Count(),
                };

            return await result.ToDictionaryAsync(x => x.Period, x => x.Count);
        }
    }
}