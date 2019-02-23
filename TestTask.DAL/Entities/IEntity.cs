namespace TestTask.DAL.Entities
{
    public interface IEntity<T>
    {
        T Id { get; set; }
    }
}