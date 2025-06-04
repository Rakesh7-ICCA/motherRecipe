using System;
using System.Collections.Generic;
using System.Data;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;

namespace Motherskitchen.BusinessLayer;

public class BlCategories
{
    SqlServerDB db = new SqlServerDB();
    string Sqlquery = string.Empty;

    public List<Categories> GetCategories()
    {
        List<Categories> categories = new List<Categories>();
        Sqlquery = "exec CategoryOperations @action='view'";
        DataTable dt = db.ExecuteQuery(Sqlquery);

        foreach (DataRow row in dt.Rows)
        {
            Categories cat = new Categories()
            {
                CategoryId = Guid.Parse(row["categoryId"].ToString()),
                Name = row["name"].ToString()
            };
            categories.Add(cat);
        }
        return categories;
    }

    public string AddCategories(Categories cat)
    {
        string Postquery = $"exec CategoryOperations @action='add', @CategoriesId='{cat.CategoryId}', @Name='{cat.Name}'";
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

    public string UpdateCategories(Categories cat, string CategoriesId)
    {
        string Updatequery = $"exec CategoryOperations @action='update', @CategoriesId='{CategoriesId}', @Name='{cat.Name}'";
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

    public string DeleteCategories(Guid CategoriesId)
    {
        string Deletequery = $"exec CategoryOperations @action='delete', @CategoriesId='{CategoriesId}'";
        try
        {
            db.ExecuteNonQuery(Deletequery);
            return "true";
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public Categories GetCategoriesById(Guid CategoriesId)
    {
        Sqlquery = $"exec CategoryOperations @action='view', @CategoriesId='{CategoriesId}'";
        DataTable dt = db.ExecuteQuery(Sqlquery);
        
        if (dt.Rows.Count > 0)
        {
            DataRow row = dt.Rows[0];
            return new Categories()
            {
                CategoryId = Guid.Parse(row["categoryId"].ToString()),
                Name = row["name"].ToString()
            };
        }
        return null;
    }

    public bool CategoriesExists(Guid CategoriesId)
    {
        Sqlquery = $"exec CategoryOperations @action='exists', @CategoriesId='{CategoriesId}'";
        DataTable dt = db.ExecuteQuery(Sqlquery);
        return dt.Rows.Count > 0 && Convert.ToInt32(dt.Rows[0]["CategoriesExists"]) == 1;
    }
}