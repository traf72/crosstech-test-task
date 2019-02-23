using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestTask.Common.Mappers;
using TestTask.DAL.Entities.Identity;
using TestTask.Logic.Services;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;
        private readonly IMapper<ApplicationUser, UserVm> _userMapper;

        public AuthController(SignInManager<ApplicationUser> signInManager, IUserService userService,
            IMapper<ApplicationUser, UserVm> userMapper)
        {
            _signInManager = signInManager;
            _userService = userService;
            _userMapper = userMapper;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<object> Post(SignInVm credentials)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(credentials.Login, credentials.Password, credentials.RememberMe, true);
            if (signInResult.Succeeded)
            {
                var user = await _userService.FindByName(credentials.Login);
                return new { user = _userMapper.Map(user) };
            }

            string error = "Неверный логин или пароль";
            if (signInResult.IsLockedOut)
            {
                error = "Пользователь заблокирован";
            }
            else if (signInResult.IsNotAllowed)
            {
                error = "Вход запрещён";
            }
            else if (signInResult.RequiresTwoFactor)
            {
                error = "Требуется двухфакторная аутентификация";
            }

            return new { error };
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<UserVm> Get()
        {
            return User.Identity != null && User.Identity.IsAuthenticated
                ? _userMapper.Map(await _userService.FindByName(User.Identity.Name))
                : null;
        }

        [HttpDelete]
        public async Task Delete()
        {
            await _signInManager.SignOutAsync();
        }
    }
}