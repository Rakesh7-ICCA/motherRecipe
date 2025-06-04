namespace Motherskitchen.Models;

public class Comments
{
    public string? CommentId { get; set; }  
    public string? RecipeId { get; set; }  
    public string? UserId { get; set; } 
    public string? CommentText { get; set; }
    public DateTime CreatedAt { get; set; }
    
}