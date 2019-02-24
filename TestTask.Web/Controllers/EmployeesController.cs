using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper<EmployeeVm, Employee> _employeeFromVmMap;

        public EmployeesController(IEmployeeService employeeService, IMapper<Employee, EmployeeVm> employeeToVmMapper,
            IMapper<EmployeeVm, Employee> employeeFromVmMap)
        {
            _employeeService = employeeService;
            _employeeToVmMapper = employeeToVmMapper;
            _employeeFromVmMap = employeeFromVmMap;
        }

        [HttpGet]
        public async Task<IEnumerable<EmployeeVm>> Get()
        {
            return _employeeToVmMapper.Map(await _employeeService.QueryAll().ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeVm>> Get(int id)
        {
            var employee = await _employeeService.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return _employeeToVmMapper.Map(employee);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<EmployeeVm> Create(EmployeeVm employee)
        {
            var newEmployee = await _employeeService.CreateOrEdit(_employeeFromVmMap.Map(employee));
            return _employeeToVmMapper.Map(newEmployee);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<EmployeeVm> Update(EmployeeVm employee)
        {
            var existingEmployee = await _employeeService.Find(employee.Id, false);
            if (existingEmployee == null)
            {
                throw new InvalidOperationException($"Сотрудник с идентификатором \"{employee.Id}\" не найден");
            }

            var editedEmployee = await _employeeService.CreateOrEdit(_employeeFromVmMap.Map(employee, existingEmployee));
            return _employeeToVmMapper.Map(editedEmployee);
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}