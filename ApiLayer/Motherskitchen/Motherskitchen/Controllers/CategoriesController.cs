using Microsoft.AspNetCore.Mvc;
using Motherskitchen.BusinessLayer;

namespace Motherskitchen.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    [HttpGet("AllCategories")]
    public IActionResult GetAllCategories()
    {
        BlCategories bc = new BlCategories();
        return Ok(bc.GetCategories());
    }
}