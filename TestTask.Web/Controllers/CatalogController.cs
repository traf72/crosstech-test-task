using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestTask.Common.Mappers;
using TestTask.DAL.Entities;
using TestTask.Logic.Services;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class CatalogController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper<Position, CatalogVm<int>> _positionMapper;

        public CatalogController(IPositionService positionService, IMapper<Position, CatalogVm<int>> positionMapper)
        {
            _positionService = positionService;
            _positionMapper = positionMapper;
        }

        [HttpGet]
        public async Task<IEnumerable<CatalogVm<int>>> Positions()
        {
            return _positionMapper.Map(await _positionService.QueryAll().ToListAsync());
        }
    }
}