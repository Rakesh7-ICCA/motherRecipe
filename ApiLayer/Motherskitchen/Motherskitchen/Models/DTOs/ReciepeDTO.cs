using System.ComponentModel.DataAnnotations;

namespace Motherskitchen.Models.DTOs;

public class ReciepeDTO
{
    [Required] 
    public Guid UserId { get; set; }
    
    [Required] 
    public string? Title { get; set; }
    
    [Required] 
    public string? Description { get; set; }
    
    [Required] 
    public string? Instruction { get; set; }
    
    [Required]
    public int Time { get; set; }
    
    [Required]
    public string CategoryId { get; set; }
    
}