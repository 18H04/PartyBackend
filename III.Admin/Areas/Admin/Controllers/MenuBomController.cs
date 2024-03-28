using Microsoft.AspNetCore.Mvc;

namespace III.Admin.Areas.Admin.Controllers
{
    public class MenuBomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
