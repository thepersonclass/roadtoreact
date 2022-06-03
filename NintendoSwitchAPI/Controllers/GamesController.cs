using Microsoft.AspNetCore.Mvc;
using NintendoSwitchAPI.Model;
using System.Text.Json;

namespace NintendoSwitchAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class GamesController : ControllerBase
{
    [HttpGet(Name = "GetGames")]
    public async Task<List<GameModel>> GetGames(string title)
    {
        await using var gamesFileStream = System.IO.File.OpenRead("./Data/content.json");
        var gamesObject = await JsonSerializer.DeserializeAsync<GamesModel>(gamesFileStream);
        var filteredGames = gamesObject.Rows.Where(x => x.Title.ToLower().Contains(title.ToLower())).ToList();
        return filteredGames;
    }
}
