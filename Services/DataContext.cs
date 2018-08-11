using Microsoft.EntityFrameworkCore;
using DotnetcoreReactRedux.Models;

namespace DotnetcoreReactRedux.Services
{
    /// <summary>
    /// Data context related to data storage, i.e. database.
    /// </summary>
    public class DataContext : DbContext
    {
        /// <summary>
        /// Data context constructor.
        /// </summary>
        /// <param name="options">Options to use when creating data context based on DbContext.</param>
        /// <returns>Returns the created data context.</returns>
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        /// <summary>
        /// User context.
        /// </summary>
        /// <value></value>
        public DbSet<User> Users { get; set; }
    }
}