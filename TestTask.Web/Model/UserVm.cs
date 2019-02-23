using System.Collections.Generic;

namespace TestTask.Web.Model
{
    public class UserVm
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public IList<string> Roles { get; set; }
    }
}