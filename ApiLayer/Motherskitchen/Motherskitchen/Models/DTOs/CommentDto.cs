namespace Motherskitchen.Models.DTOs;

public class CommentDto
{
    public string? comment { get; set; }
    public Guid? userId { get; set; }
    public Guid? recipeId { get; set; }
}