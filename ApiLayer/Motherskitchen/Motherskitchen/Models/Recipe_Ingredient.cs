namespace Motherskitchen.Models;

public class Recipe_Ingredient
{
    public string?  FavoriteId {  get; set; }
    public string? UserId { get; set; }
    public string? RecipeId { get; set; }   
    public DateTime CreatedAt {  get; set; }
}