using System.Text.Json.Serialization;

namespace NintendoSwitchAPI.Model
{
    public class GamesModel
    {
        [JsonPropertyName("rows")]
        public List<GameModel> Rows { get; set; }
    }
}
