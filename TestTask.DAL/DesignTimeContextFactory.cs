using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TestTask.DAL
{
    public class DesignTimeContextFactory : IDesignTimeDbContextFactory<TestTaskContext>
    {
        public TestTaskContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TestTaskContext>();
            optionsBuilder.UseSqlite(@"Data Source=test.db");
            return new TestTaskContext(optionsBuilder.Options);
        }
    }
}