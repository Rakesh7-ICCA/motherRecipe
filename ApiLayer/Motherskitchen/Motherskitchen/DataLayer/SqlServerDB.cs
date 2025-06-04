using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Motherskitchen.DataLayer;

public class SqlServerDB
{ 
    public string con=string.Empty;

    public SqlServerDB()
    {
        var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["dbString"];
        con = Convert.ToString(connString);
    }

    public DataTable ExecuteQuery(string query)
    {
        SqlConnection conn = new SqlConnection(con);
        conn.Open();
        SqlCommand cmd = new SqlCommand(query, conn);
        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
        DataTable table = new DataTable();
        adapter.Fill(table);
        return table;
    }

    public int ExecuteNonQuery(string query)
    {
        SqlConnection conn = new SqlConnection(con);
        conn.Open();
        SqlCommand cmd = new SqlCommand(query, conn);
        int count= cmd.ExecuteNonQuery();
        conn.Close();
        return count;
        
    }
    
    public int UpdateQuery(string query)
    {
        SqlConnection conn = new SqlConnection(con);
        conn.Open();
        SqlCommand cmd = new SqlCommand(query, conn);
        return cmd.ExecuteNonQuery();
        conn.Close();
    }

    public int DeleteQuery(string query)
    {
        SqlConnection conn = new SqlConnection(con);
        conn.Open();
        SqlCommand cmd = new SqlCommand(query, conn);
        return cmd.ExecuteNonQuery();
        conn.Close();
    }
    
}