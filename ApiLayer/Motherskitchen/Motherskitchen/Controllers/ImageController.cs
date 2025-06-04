using Microsoft.AspNetCore.Mvc;
using Motherskitchen.BusinessLayer;
using Motherskitchen.DataLayer;
using Motherskitchen.Models;

namespace Motherskitchen.Controllers;

[Route(template: "api/[controller]")]
[ApiController]

public class ResponseController : Controller
{
    [HttpPost("addEmployeePic")]
    public IActionResult AddEmployeePic([FromForm] FileModel img, [FromQuery] Guid RecipeId)
    {
        try
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources", "Images",
                img.fileName + "_profile.jpg");
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                img.File.CopyTo(stream);
                string res = new BlRecipe().ImageInsert(imagePath, RecipeId, img.File, "");
                if (res == "true")
                    return Ok(new { message = "Employee Pic added Successfully" });
                else
                {
                    return Ok(new { message = "Employee Pic Not Added Successfully - " + res });
                }
            }
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

}