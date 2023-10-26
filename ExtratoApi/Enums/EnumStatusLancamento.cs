using System.Text.Json.Serialization;

namespace LancamentoApi.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EnumStatusLancamento
    {
        Valido,
        Cancelado
    }
}
