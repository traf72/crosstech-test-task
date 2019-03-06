using System.Linq;
using TestTask.DAL;
using TestTask.DAL.Entities;
using TestTask.Logic.Services;

namespace TestTask.Logic.ServicesImpl
{
    public class PositionService : IPositionService
    {
        private readonly TestTaskContext _dbContext;

        public PositionService(TestTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Position> QueryAll()
        {
            return _dbContext.Positions;
        }
    }
}