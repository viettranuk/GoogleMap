using Microsoft.AspNetCore.Mvc;

namespace GoogleMap.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult CurrentLocation()
        {
            return View();
        }

        public IActionResult NearbyShops()
        {
            return View();
        }
    }
}
