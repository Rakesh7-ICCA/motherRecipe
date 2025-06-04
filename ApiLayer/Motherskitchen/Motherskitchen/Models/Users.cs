namespace Motherskitchen.Models;

//
public class Users
{
    public Guid UserId { get; set; } 
    public string? userName { get; set; } 
    public string? Email { get; set; } 
    public string? PasswordHash { get; set; }
    
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } 
}