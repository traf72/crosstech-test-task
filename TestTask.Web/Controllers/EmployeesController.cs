using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<EmployeeVm>> Get()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeVm>> Get(int id)
        {
            throw new NotImplementedException();
            return NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<int> Create(EmployeeVm employee)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task Update(EmployeeVm employee)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}