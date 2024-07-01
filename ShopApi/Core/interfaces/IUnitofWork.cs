using Core.Entities;

namespace Core.interfaces
{
    public interface IUnitofWork : IDisposable

    {
        IGenericRepository<TEntity> Rpository<TEntity>() where TEntity : BaseEntity;
        Task<int> Complete();
    }
}
