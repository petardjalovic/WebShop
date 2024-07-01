using Core.Entities;
using Core.Specifications;

namespace Core.interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {

        public Task<T> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
        public Task<IReadOnlyList<T>> ListAllAsync()
        {
            throw new NotImplementedException();
        }
        Task<T> GetEntityWithSpec(Ispecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(Ispecification<T> spec);
        Task<int> CountAsync(Ispecification<T> spec);
        void Add(T entity);
        void Delete(T entity);

        void Update(T entity);
    }
}
