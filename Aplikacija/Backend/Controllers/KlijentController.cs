namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class KlijentController : ControllerBase
{
    public PPContext Context { get; set; }
    public KlijentController(PPContext context)
    {
        Context = context;
    }
}