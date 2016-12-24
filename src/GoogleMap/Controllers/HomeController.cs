using Microsoft.AspNetCore.Mvc;

namespace GoogleMap.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult CurrentLocation()
        {
            return View();
        }
    }
}
