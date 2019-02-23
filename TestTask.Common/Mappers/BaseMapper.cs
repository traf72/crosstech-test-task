using System.Collections.Generic;
using System.Linq;

namespace TestTask.Common.Mappers
{
    /// <summary>
    /// Базовый маппер
    /// </summary>
    public abstract class BaseMapper<TFrom, TTo> : IMapper<TFrom, TTo>
    {
        public TTo Map(TFrom input)
        {
            return Map(input, default);
        }

        public abstract TTo Map(TFrom input, TTo output);

        public IEnumerable<TTo> Map(IEnumerable<TFrom> input)
        {
            return input?.Select(Map);
        }
    }
}