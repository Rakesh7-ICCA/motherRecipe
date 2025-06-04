using System.Data;
using Microsoft.AspNetCore.Mvc;
using Motherskitchen.BusinessLayer;
using Motherskitchen.Models;
using Motherskitchen.Models.DTOs;

namespace Motherskitchen.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    BlComment blc = new BlComment();
    
    [HttpPost("addComment")]
    public IActionResult AddComment([FromBody]CommentDto cd)
    {
        return Ok(blc.PostComment(cd));
    }

    [HttpGet("getComments/{recipeId}")]
    public IActionResult GetComments(Guid recipeId)
    {
        string baseUrl = $"{Request.Scheme}://{Request.Host}/";;
        return Ok(blc.GetCommentsOfARecipe(recipeId, baseUrl));
    }

}