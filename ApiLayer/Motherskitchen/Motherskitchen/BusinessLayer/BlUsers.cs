using System.Data;
using Microsoft.Data.SqlClient;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;

namespace Motherskitchen.BusinessLayer;

public class BlUsers
{
    SqlServerDB db = new SqlServerDB();
    string Sqlquery = string.Empty;
    
    public List<Users> GetUsers()
    {
        List<Users> users = new List<Users>();
        string query = "exec UserOperations @action ='view'";
       DataTable dt = new DataTable();  

        foreach (DataRow row in dt.Rows)
        {
            Users user = new Users()
            {
                UserId = Guid.Parse(row["UserId"].ToString()),
                userName = (string)row["userName"],
                Email = (string)row["Email"],
                PasswordHash = (string)row["PasswordHash"],
                CreatedAt = (DateTime)row["CreatedAt"]
            };
            users.Add(user);
        }
        return users;
    }

    // public Users GetUserById(Guid userId)
    // {
    //     string sqlquery = "exec UserOperations @action ='view' where UserId=@userId";
    //    int count = db.ExecuteQuery(sqlquery, new { userId = userId });
    //    return count > 0 ? new Users() { UserId = userId } : null;
    // }
    

    public string PostUser(Users user)
    {
        
      string  Postquery = $"exec UserOperations @action ='add',@UserId='{user.UserId}',@userName='{user.userName}',@Email='{user.Email}',@PasswordHash='{user.PasswordHash}'";
      try
      {
          db.ExecuteNonQuery(Postquery);
          return "true";
      }
      catch  (Exception ex)
      {
          return ex.Message;
      }
       
    }

    public string UpdateUser(Users user,string UserId)
    {
        
        string  updateQuery = $"exec UserOperations @action ='update',@UserId='{user.UserId}', @userName='{user.userName}',@Email='{user.Email}',@PasswordHash='{user.PasswordHash}'";
        try
        {
            db.ExecuteNonQuery(updateQuery);
            return "true";
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
        
    }
    
       

    public string DeleteUser(string userId)
    {
        string DeleteQuery = $"exec UserOperations @action ='delete',@UserId='{userId}'";
        try
        {
            db.ExecuteNonQuery(DeleteQuery);
            return "true";
        }
        catch (Exception ex)
        {
            return ex.Message;
            
        }
    }

    public string updateProfileImage(Guid userId, string Path, IFormFile file, bool remove)
    {
        try
        {
            using (var stream = new FileStream(System.IO.Path.Join(Directory.GetCurrentDirectory(), Path), FileMode.Create))
            {
                file.CopyTo(stream);
                string Updatequery = (remove ? $"exec HandleProfileImage @removeImage = 1, @imageurl='{Path}', @userid='{userId}'" : $"exec HandleProfileImage @imageurl='{Path}', @userid='{userId}'");
                try
                {
                    db.ExecuteNonQuery(Updatequery);
                    return "true";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }
        catch (Exception e)
        {
            return e.Message;
        }

    }

    public bool passwordChanger(string OldPassword, string NewPassword, Guid UserId)
    {
        string query = $"select * from users where passwordHash = '{OldPassword}' and userId = '{UserId}'";
        DataTable dt = new SqlServerDB().ExecuteQuery(query);
        if (dt.Rows.Count > 0)
        {
            query = $"update users set passwordHash = '{NewPassword}' where userId = '{UserId}'";
            int num = db.ExecuteNonQuery(query);
            if (num > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}