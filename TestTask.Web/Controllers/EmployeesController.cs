using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.Common.Mappers;
using TestTask.DAL.Entities;
using TestTask.Logic.Services;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper<Employee, EmployeeVm> _employeeToVmMapper;

        public EmployeesController(IEmployeeService employeeService, IMapper<Employee, EmployeeVm> employeeToVmMapper)
        {
            _employeeService = employeeService;
            _employeeToVmMapper = employeeToVmMapper;
        }

        [HttpGet]
        public async Task<IEnumerable<EmployeeVm>> Get()
        {
            return _employeeToVmMapper.Map(await _employeeService.GetAll());
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