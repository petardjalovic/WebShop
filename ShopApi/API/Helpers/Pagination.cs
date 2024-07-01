namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int count, int pageCount, IReadOnlyList<T> data)
        {
            PageIndex = pageIndex;
            Count = count;
            PageCount = pageCount;
            Data = data;

        }



        public int PageIndex { get; set; }

        public int Count { get; set; }
        public int PageCount { get; set; }
        public IReadOnlyList<T> Data { get; set; }
    }
}
