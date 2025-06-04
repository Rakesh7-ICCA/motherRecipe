using System.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;

namespace Motherskitchen.BusinessLayer;

public class BlRecipe
{
    SqlServerDB db = new SqlServerDB();
    string Sqlquery = string.Empty;

    public List<Recipe> GetRecipes(string url)
    {
        List<Recipe> recipes = new List<Recipe>();
        Sqlquery = "exec RecipeOperations @action ='view'";
        DataTable dt = db.ExecuteQuery(Sqlquery);

        foreach (DataRow row in dt.Rows)
        {
            string? image = row["Image"].ToString();
            if (image != null && image.Length > 0)
            {
                image = image.Replace(@"\", @"/");
                
            }
            Recipe rec = new Recipe()
            {
                RecipeId = Guid.Parse(row["RecipeId"].ToString()),
                UserId = Guid.Parse(row["UserId"].ToString()),
                Title = (string)row["Title"],
                Description = (string)row["Description"],
                Instruction = (string)row["Instruction"],
                //CategoryId=(int) row["CategoryId"],
                RecipeImage =(image == null ||  image.Length <=0 ? null : $"{url}{image}"),
            };
            recipes.Add(rec);
        }

        return recipes;
    }

    public List<Recipe> ExplorePage(Guid UserId, string url)
    {
        List<Recipe> recipes = new List<Recipe>();
        Sqlquery = $"exec ExplorePage @userId ='{UserId}'";
        DataTable dt = db.ExecuteQuery(Sqlquery);

        foreach (DataRow row in dt.Rows)
        {
            string? image = row["Imageurl"].ToString();
            if (image != null && image.Length > 0)
            {
                image = image.Replace(@"\", @"/");
                
            }
            Recipe rec = new Recipe()
            {
                RecipeId = Guid.Parse(row["RecipeId"].ToString()),
                UserId = Guid.Parse(row["UserId"].ToString()),
                Title = (string)row["Title"],
                Time = (int)row["Time"],
                author = (string)row["author"],
                CatagoryName = (string)row["catName"],
                Description = (string)row["Description"],
                Instruction = (string)row["Instruction"],
                RecipeImage = (image == null ||  image.Length <=0 ? null : $"{url}{image}"),
                commentCount = int.Parse(row["commentsCount"].ToString())
                //CategoryId=(int) row["CategoryId"],
            };
            recipes.Add(rec);
        }

        return recipes;
    }

    public string AddRecipe(Recipe rec)
    {
        string Postquery =
            $"exec RecipeOperations @action ='add',@RecipeId='{rec.RecipeId}',@userId='{rec.UserId}',@Title='{rec.Title}',@Description='{rec.Description}',@Instruction='{rec.Instruction}', @time = {rec.Time}, @categoryID = '{rec.CatagoryID}'";
        try
        {
            db.ExecuteNonQuery(Postquery);
            return "true";
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public string UpdateRecipe(Recipe rec, string RecipeId)
    {
        string Updatequery =
            $"exec RecipeOperations @action ='update', @userId='{rec.UserId}',@Title='{rec.Title}',@Description='{rec.Description}',@Instruction='{rec.Instruction}', @RecipeId='{RecipeId}', @CATEGORYID='{rec.CatagoryID}'";
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

    public List<Recipe> getRecipesbyUserId(Guid UserId, string url)
    {
        Sqlquery = $"exec RecipeOperations @action ='view', @USERID = '{UserId}'";
        List<Recipe> recipes = new List<Recipe>();
        DataTable dt = db.ExecuteQuery(Sqlquery);
        if (dt.Rows.Count > 0)
        {
            foreach (DataRow row in dt.Rows)
            {
                string? image = row["Imageurl"].ToString();
                if (image != null && image.Length > 0)
                {
                    image = image.Replace(@"\", @"/");
                
                }
                Recipe r = new Recipe();
                r.RecipeId = Guid.Parse(row["RecipeId"].ToString());
                r.Title = row["Title"].ToString();
                r.Description = row["Description"].ToString();
                r.Time = Convert.ToInt32(row["Time"].ToString());
                r.CatagoryName = row["catname"].ToString();
                r.RecipeImage = (image == null ||  image.Length <=0 ? null : $"{url}{image}");
                recipes.Add(r);
            }

            return recipes;
        }
        else
        {
        }

        return recipes;
    }

    public Recipe getRecipeById(Guid RecipeId, string url, Guid userId)
    {
        Recipe rec = new Recipe();
        string query = $"exec [RecipeOperations] @action ='view', @RecipeId='{RecipeId}', @userId='{userId}'";
        DataTable dt = db.ExecuteQuery(query);
        if (dt.Rows.Count > 0)
        {
            string? image = dt.Rows[0]["Imageurl"].ToString();
            if (image != null && image.Length > 0)
            {
                image = image.Replace(@"\", @"/");
            }
            DataRow row = dt.Rows[0];
            rec.RecipeId = Guid.Parse(row["RecipeId"].ToString());
            rec.Title = row["Title"].ToString();
            rec.Description = row["Description"].ToString();
            rec.Instruction = row["Instruction"].ToString();
            rec.Time = Convert.ToInt32(row["Time"].ToString());
            rec.CatagoryName = row["catname"].ToString();
            rec.author = row["author"].ToString();
            rec.CatagoryID = Guid.Parse(row["CategoryID"].ToString());
            rec.RecipeImage = (image == null || image.Length <= 0 ? null : $"{url}{image}");
            rec.saved = (bool)(row["saved"]);
            return rec;
        }
        else
        {
            return rec;
        }
    }

    public string SaveRecipe(Guid recipeId, Guid UserId)
    {
        string query = $"exec SaveRecipe @userId = '{UserId}', @recipeId = '{recipeId}'";
        int cnt = db.ExecuteNonQuery(query);
        if (cnt > 0)
            return "Saved Successfully";
        else
            return "cannot saved";
    }

    public List<Recipe> SavedRecipes(Guid UserId)
    {
        List<Recipe> recipes = new List<Recipe>();
        Sqlquery = $"exec SavedPost @userId ='{UserId}'";
        DataTable dt = db.ExecuteQuery(Sqlquery);

        foreach (DataRow row in dt.Rows)
        {
            Recipe rec = new Recipe()
            {
                RecipeId = Guid.Parse(row["RecipeId"].ToString()),
                UserId = Guid.Parse(row["UserId"].ToString()),
                Title = (string)row["Title"],
                Description = (string)row["Description"],
                Time = (int)row["Time"],
                CatagoryName = row["catname"].ToString(),
                author = row["author"].ToString(),
                //CategoryId=(int) row["CategoryId"],
            };
            recipes.Add(rec);
        }

        return recipes;
    }

    public int savedRecipesCount(Guid UserId)
    {
        Sqlquery = $"exec SavedPost @userId ='{UserId}', @count = 1";
        DataTable dt = db.ExecuteQuery(Sqlquery);
        if (dt.Rows.Count > 0)
        {
            return Convert.ToInt32(dt.Rows[0]["savePostcount"]);
        }
        else
        {
            return 0;
        }
    }
    
    public string ImageInsert(string filePath, Guid RecipeId, IFormFile file, string relativePath)
    {
        
        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
                string Updatequery =
                    $"exec RecipeOperations @action ='update', @imageUpdate = 1, @imageurl='{relativePath}', @recipeId='{RecipeId}'";
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
}