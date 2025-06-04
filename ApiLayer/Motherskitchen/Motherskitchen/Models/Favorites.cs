namespace Motherskitchen.Models;

public class Favorites
{
    public int FavoriteId {  get; set; }
    public int UserId { get; set; }
    public int RecipeId { get; set; }
 
    public string CreatedAt {  get; set; }   
}