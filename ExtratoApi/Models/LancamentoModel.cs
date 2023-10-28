using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LancamentoApi.Enums;

namespace LancamentoApi.Models
{
    public class LancamentoModel
    {
        public int Id { get; set; }
        public string? descricao { get; set; }
        public DateTime dia { get; set; }
        public decimal valor { get; set; }
        public EnumTipoLan avulso { get; set; }
        public EnumStatusLancamento status { get; set; }

    }
}