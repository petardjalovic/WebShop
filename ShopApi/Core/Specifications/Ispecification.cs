using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface Ispecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        Expression<Func<T, object>> orderBy { get; }
        Expression<Func<T, object>> orderByDescending { get; }
        int Take { get; }
        int Skip { get; }

        bool IsPaginationEmbeld { get; }
    }
}
