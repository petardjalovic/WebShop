using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecification<T> : Ispecification<T>
    {
        public BaseSpecification()
        {

        }
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;

        }

        public Expression<Func<T, bool>> Criteria { get; }

        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> orderBy { get; private set; }

        public Expression<Func<T, object>> orderByDescending { get; private set; }

        public int Take { get; private set; }

        public int Skip { get; private set; }

        public bool IsPaginationEmbeld { get; private set; }
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {

            Includes.Add(includeExpression);

        }
        protected void AddorderBY(Expression<Func<T, object>> orderBYexpression)
        {
            orderBy = orderBYexpression;
        }
        protected void AddorderBYDescending(Expression<Func<T, object>> orderBYDescexpression)
        {
            orderByDescending = orderBYDescexpression;
        }
        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPaginationEmbeld = true;
        }
    }
}
