using Mapster;

namespace TestTask.Common.Mappers
{
    /// <summary>
    /// Авто маппер
    /// </summary>
    public class AutoMapper<TFrom, TTo> : BaseMapper<TFrom, TTo> where TTo : new()
    {
        public override TTo Map(TFrom input, TTo output)
        {
            if (Equals(input, default(TFrom)))
            {
                return default;
            }

            var result = Equals(output, default(TTo)) ? new TTo() : output;
            result = input.Adapt(result);

            return result;
        }
    }
}