using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.Logic.Services;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IDictionary<string, int>> EmplyeesCountBySex()
        {
            return await _reportService.EmplyeesCountBySex();
        }
    }
}