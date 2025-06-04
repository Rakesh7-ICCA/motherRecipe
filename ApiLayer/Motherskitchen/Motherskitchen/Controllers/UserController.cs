using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Motherskitchen.BusinessLayer;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;
using Motherskitchen.Models.DTOs;

namespace Motherskitchen.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
   BlUsers bl = new BlUsers();
    
  [HttpGet("GetUsers")]
  public IActionResult GetUsers()
  {
    List<Users> users = bl.GetUsers();
    SqlServerDB db = new SqlServerDB();
    string query = $"SELECT * FROM Users";
    DataTable tbls = db.ExecuteQuery(query);

    foreach (DataRow tbl in tbls.Rows)
    {
      Users user = new Users();
      user.UserId = Guid.Parse(tbl["UserId"].ToString());
      user.userName = tbl["UserName"].ToString();
      user.PasswordHash = tbl["PasswordHash"].ToString();
      user.Email = tbl["Email"].ToString();
      users.Add(user);
    }
    return Ok(users);  
  }

   [HttpGet("GetUser/{UserId}")]
   public IActionResult GetUser(string UserId)
   {
     SqlServerDB db = new SqlServerDB();
     string query = $"SELECT * FROM Users WHERE UserId = '{UserId}'";
     DataTable tbl = db.ExecuteQuery(query);
     Users user = new Users();
     user.UserId = Guid.Parse(tbl.Rows[0]["UserId"].ToString());
     user.userName = tbl.Rows[0]["UserName"].ToString();
     user.Email = tbl.Rows[0]["Email"].ToString();
     user.ImageUrl = Request.Scheme+"://"+Request.Host+"/"+ tbl.Rows[0]["profilePicture"].ToString().Replace("\\", "/");
     return Ok(user); 
     
   }
   
  [HttpPost("GetUser")]
  public IActionResult GetUser(LoginDto login)
  {
    SqlServerDB db = new SqlServerDB();
    string query =  $"select userId from Users where Email = '{login.Email}' and PasswordHash = '{login.Password}'";
    DataTable table = db.ExecuteQuery(query);
    if (table.Rows.Count > 0)
    {
      return Ok(new
      {
        message = "Login Successfully",
        userId = table.Rows[0]["userId"],
      });
    }
    return BadRequest("Invalid Credentials");
  }

  [HttpPost("AddUser")]
  public IActionResult AddUser([FromBody] UsersDto user)
  {

    SqlServerDB db = new SqlServerDB();
    string query = $"select * from Users where username='{user.userName}'";
    DataTable dt = db.ExecuteQuery(query);
    if (dt.Rows.Count > 0)
    {
      return BadRequest("User already exists");
    }

    query = $"select * from users where email='{user.Email}'";
    dt = db.ExecuteQuery(query);
    if (dt.Rows.Count > 0)
    {
      return BadRequest("Email already exists");
    }

  Users uu = new Users()
    {
      Email = user.Email,
      PasswordHash = user.Password,
      userName =  user.userName,
      UserId = Guid.NewGuid()
    };
    
    
    string res=bl.PostUser(uu);
    if (res == "true")
    {
      return Ok("User added successfully");
    }
    else
    {
      return Ok(res);
    }
  }

  [HttpPut("UpdateUser{UserID}")]
  public IActionResult UpdateUser(string UserID,[FromBody] Users user)
  {
    string msg= bl.UpdateUser(user,UserID);
    return msg == "true"? Ok("Updated user successfully") : Ok(msg);
    
  }
  
  [HttpDelete("DeleteUser/{UserId}")]
  public IActionResult DeleteUser(string userId)
  {
     string res=bl.DeleteUser(userId);
    if (res == "true")
    {
      return Ok("User deleted successfully");
    }
    else
    {
      return Ok(res);
    }
  }

  [HttpPost("profilePicture")]
  public IActionResult GetProfilePicture([FromForm]FileModel profilePicture, [FromQuery]Guid UserId, [FromQuery]bool remove )
  {
    string pth = Path.Join("Resources", "Images", profilePicture.fileName+"_profilePicture.jpg");
    return Ok(bl.updateProfileImage(UserId, pth, profilePicture.File, remove));
  }


  [HttpPost("updatePassword")]
  public IActionResult UpdatePassword([FromForm] string password, [FromForm] string newPassword,
    [FromQuery] Guid UserId)
  {
    if (bl.passwordChanger(password, newPassword, UserId))
    {
      return Ok("Password changed successfully");
    }
    else
    {
      return Ok("Password not changed");
    }
  }
}