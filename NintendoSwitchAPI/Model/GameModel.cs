using System.Text.Json.Serialization;

namespace NintendoSwitchAPI.Model
{
    public class GameModel
    {
        [JsonPropertyName("nsuid_na")]
        public long? NSUIDNA { get; set; }
        [JsonPropertyName("nsuid_eu")]
        public long? NSUIDEU { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("genre")]
        public string Genre { get; set; }
        [JsonPropertyName("cover_art_url")]
        public string CoverArtUrl { get; set; }
        [JsonPropertyName("slug")]
        public string Slug { get; set; }
        [JsonPropertyName("free_to_start")]
        public int FreeToStart { get; set; }
        [JsonPropertyName("eu_shop")]
        public int? EUShop { get; set; }
        [JsonPropertyName("na_shop")]
        public int NAShop { get; set; }
        [JsonPropertyName("eshop_list_price_na")]
        public decimal? EshopListPriceNA { get; set; }
        [JsonPropertyName("eshop_list_price_eu")]
        public decimal? EshopListPriceEU { get; set; }
        [JsonPropertyName("has_eshop_discount")]
        public int HasEshopDiscount { get; set; }
        [JsonPropertyName("has_eshop_discount_eu")]
        public int HasEshopDiscountEU { get; set; }
        [JsonPropertyName("eshop_discount_price")]
        public Decimal? EshopDiscountPrice { get; set; }
        [JsonPropertyName("eshop_discount_percent")]
        public int? EshopDiscountPercent { get; set; }
        [JsonPropertyName("has_physical_release")]
        public int HasPhysicalRelease { get; set; }
        [JsonPropertyName("number_of_players")]
        public string NumberOfPlayers { get; set; }
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("rating")]
        public int? Rating { get; set; }
        [JsonPropertyName("rcount")]
        public int Rcount { get; set; }
        [JsonPropertyName("eu_date")]
        public DateTime? EUDate { get; set; }
        [JsonPropertyName("na_date")]
        public DateTime? NADate { get; set; }
        [JsonPropertyName("sale_ends")]
        public DateTime? SaleEnds { get; set; }
    }
}
