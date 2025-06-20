﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Motherskitchen.BusinessLayer;
using Motherskitchen.Models;
using Motherskitchen.Models.DTOs;

namespace Motherskitchen.Controllers;
[Route("api/[controller]")]
[ApiController]

public class RecipeController : ControllerBase
{
    
    BlRecipe bl = new BlRecipe();
    
    [HttpGet("GetRecipes")]
    public IActionResult GetRecipes()
    {
    string baseUrl = $"{Request.Scheme}://{Request.Host}/";;
        BlRecipe bl = new BlRecipe();
        List<Recipe> li = bl.GetRecipes(baseUrl);
        return Ok(li);
        
    }

    
    [HttpGet("ExplorePage")]
    public IActionResult ExplorePage([FromQuery]Guid userId)
    {
    string baseUrl = $"{Request.Scheme}://{Request.Host}/";;
        BlRecipe bl = new BlRecipe();
        List<Recipe> li = bl.ExplorePage(userId, baseUrl);
        return Ok(li);
        
    }
    
    
    [HttpPost("AddRecipe")]
    public IActionResult AddRecipe([FromBody] ReciepeDTO recipe)
    {
        Guid id = Guid.NewGuid();
        Recipe rc = new Recipe()
        {
            RecipeId = id,
            UserId = recipe.UserId,
            Instruction =  recipe.Instruction,
            Description =  recipe.Description,
            Title = recipe.Title,
            Time = recipe.Time,
            CatagoryID = Guid.Parse(recipe.CategoryId)
        };
        
        string msg = bl.AddRecipe(rc);
            return msg== "true"?  Ok(new {msg="Added new receipe successfully", rid=rc.RecipeId}) : BadRequest(msg);
    }

    [HttpPut("UpdateRecipe/{RecipeID}")]
    public IActionResult UpdateRecipe(string RecipeID,[FromBody] Recipe recipe)
    {
        string msg = bl.UpdateRecipe(recipe , RecipeID);
        return msg == "true" ? Ok("Updated receipe successfully") : Ok(msg);
    }

    [HttpGet("GetRecipesbyUserId/{UserId}")]
    public IActionResult GetRecipesbyUserId(Guid UserId)
    {
        string baseUrl = $"{Request.Scheme}://{Request.Host}/";
        BlRecipe bl = new BlRecipe();
        return Ok(bl.getRecipesbyUserId(UserId, baseUrl));
    }

    [HttpGet("GetRecipesbyRecipeId/{UserId}/{RecipeId}")]
    public IActionResult GetRecipesbyRecipeId([FromRoute]Guid UserId, [FromRoute] Guid RecipeId )
    {
        string baseUrl = $"{Request.Scheme}://{Request.Host}/";;
        return Ok(bl.getRecipeById(RecipeId, baseUrl, UserId));
    }

    [HttpPost("SaveRecipe/{UserId}")]
    public IActionResult SaveRecipe([FromQuery] Guid RecipeId, [FromRoute] Guid UserId)
    {
        return Ok(bl.SaveRecipe(RecipeId, UserId));
    }

    [HttpGet("SavedPosts/{UserId}")]
    public IActionResult SavedPosts([FromRoute] Guid UserId)
    {
        return Ok(bl.SavedRecipes(UserId));
    }
    
    [HttpGet("SavedPostsCount/{UserId}")]
    public IActionResult SavedPostsCount([FromRoute] Guid UserId)
    {
        return Ok(bl.savedRecipesCount(UserId));
    }
    
    [HttpPost("AddImageToRecipe/{RecipeId}")]
    public IActionResult AddImageToRecipe([FromForm] FileModel fm, [FromRoute] Guid RecipeId)
    {
        string relativePath = Path.Join("Resources", "Images", (RecipeId +"_"+fm.fileName + "_recipePic.jpg"));
        string path = Path.Join(Directory.GetCurrentDirectory(),relativePath);
        string res = bl.ImageInsert(path, RecipeId, fm.File, relativePath);
        if (res == "true")
        {
            return Ok();
        }
        else
        {
            return BadRequest();
        }
    }
}