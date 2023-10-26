using System.Text.Json.Serialization;

namespace LancamentoApi.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EnumTipoLan
    {
        Valido,
        NaoAvulso
    }
}
