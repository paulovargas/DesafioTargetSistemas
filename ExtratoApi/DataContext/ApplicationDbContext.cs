using Microsoft.EntityFrameworkCore;
using LancamentoApi.Models;

namespace LancamentoApi.DataContext
{
    public class ApplicationDbContext : DbContext
    {
       
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        public DbSet<LancamentoModel> Lancamento { get; set; }
    }
}
