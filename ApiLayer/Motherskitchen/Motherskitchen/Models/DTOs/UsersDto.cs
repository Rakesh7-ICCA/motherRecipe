using System.ComponentModel.DataAnnotations;

namespace Motherskitchen.Models.DTOs;

public class UsersDto
{
    [Required]
    public string? userName { get; set; } 
    [Required]
    public string? Email { get; set; } 
    [Required]
    public string? Password { get; set; }
}