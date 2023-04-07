namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public PPContext Context { get; set; }
    public  KorisnikController(PPContext context)
    {
        Context = context;
    }
}