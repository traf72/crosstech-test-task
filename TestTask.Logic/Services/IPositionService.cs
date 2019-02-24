using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DAL.Entities;

namespace TestTask.Logic.Services
{
    public interface IPositionService
    {
        IQueryable<Position> QueryAll();
    }
}