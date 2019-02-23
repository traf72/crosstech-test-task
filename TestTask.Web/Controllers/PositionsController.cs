using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<CatalogVm<int>>> Get()
        {
            throw new NotImplementedException();
        }
    }
}