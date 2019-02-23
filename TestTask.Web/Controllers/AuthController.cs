using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestTask.Web.Model;

namespace TestTask.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<IdentityUser<int>> _signInManager;

        public AuthController(SignInManager<IdentityUser<int>> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<object> Post(SignInVm credentials)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(credentials.Login, credentials.Password, credentials.RememberMe, true);
            if (signInResult.Succeeded)
            {
                return new { user = await GetUser(credentials.Login) };
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
                ? await GetUser(User.Identity.Name)
                : null;
        }

        private async Task<UserVm> GetUser(string name)
        {
            var userManager = _signInManager.UserManager;
            var user = await userManager.FindByNameAsync(name);
            if (user == null)
            {
                return null;
            }

            var userVm = new UserVm();
            userVm = user.Adapt(userVm);
            userVm.Roles = await userManager.GetRolesAsync(user);

            return userVm;
        }

        [HttpDelete]
        public async Task Delete()
        {
            await _signInManager.SignOutAsync();
        }
    }
}