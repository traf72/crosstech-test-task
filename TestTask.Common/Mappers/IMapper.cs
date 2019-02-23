using System.Collections.Generic;

namespace TestTask.Common.Mappers
{
    /// <summary>
    /// Интерфейс для маппинга сущностей
    /// </summary>
    /// <typeparam name="TFrom">Тип сущности, из которой производится маппинг</typeparam>
    /// <typeparam name="TTo">Тип сущности, в которую производится маппинг</typeparam>
    public interface IMapper<in TFrom, TTo>
    {
        /// <summary>
        /// Мапит одну сущность
        /// </summary>
        TTo Map(TFrom input);

        /// <summary>
        /// Мапит одну сущность, принимая на вход объект, в который нужно замапить
        /// </summary>
        TTo Map(TFrom input, TTo output);

        /// <summary>
        /// Мапит список сущностей
        /// </summary>
        IEnumerable<TTo> Map(IEnumerable<TFrom> input);
    }
}