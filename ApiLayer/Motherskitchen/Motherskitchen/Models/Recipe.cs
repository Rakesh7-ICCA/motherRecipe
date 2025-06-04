using System.ComponentModel.DataAnnotations;

namespace Motherskitchen.Models;

public class Recipe
{
    [Required] 
    public Guid RecipeId { get; set; }
    
    [Required]
    public string RecipeImage { get; set; }
    
    [Required] 
    public Guid UserId { get; set; }
    
    [Required] 
    public string? Title { get; set; }
    
    [Required] 
    public string? Description { get; set; }
    
    [Required] 
    public string? Instruction { get; set; }
    
    [Required]
    public int? Time { get; set; }
    
    [Required] 
    public Guid? CatagoryID { get; set; }
    
    public string? CatagoryName { get; set; }
    
    public string? author{ get; set; }
    
    public int commentCount { get; set; }
    
    public bool saved { get; set; }
    
}