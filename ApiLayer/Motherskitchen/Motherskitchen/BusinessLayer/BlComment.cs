using System.Data;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;
using Motherskitchen.Models.DTOs;

namespace Motherskitchen.BusinessLayer;

public class BlComment
{
    SqlServerDB db = new SqlServerDB();

    public string PostComment(CommentDto cd)
    {
        string query =
            $"exec HandleComment @action='Insert', @userId = '{cd.userId}', @recipeId = '{cd.recipeId}', @comment = '{cd.comment}'";
        int cnt = db.ExecuteNonQuery(query);
        if (cnt > 0)
            return "commented";
        else
            return "cannot Comment";
    }

    public List<Comment> GetCommentsOfARecipe(Guid recipeId, string url)
    {
        
        string query =
            $"exec HandleComment @action='Select', @recipeId = '{recipeId}'";
        List<Comment> comments = new List<Comment>();
        DataTable dt = db.ExecuteQuery(query);
        if (dt.Rows.Count > 0)
        {
            foreach (DataRow row in dt.Rows)
            {
                string? image = row["ProfilePicture"].ToString();
                if (image != null && image.Length > 0)
                {
                    image = image.Replace(@"\", @"/");
                
                }
                Comment c = new Comment();
                c.comment = row["Comment"].ToString();
                c.CommentId = Guid.Parse(row["CommentsId"].ToString());
                c.profilePicture = (image == null ||  image.Length <=0 ? null : $"{url}{image}");
                c.userName = row["UserName"].ToString();
                comments.Add(c);
            }

            return comments;
        }
        else
        {
        }

        return comments;
    }
}