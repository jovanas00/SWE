namespace PetPlanet.Controllers;

[ApiController]
[Route("[controller]")]
public class PetPlanetController : ControllerBase
{
    public PPContext Context { get; set; }
    public PetPlanetController(PPContext context)
    {
        Context = context;
    }
}