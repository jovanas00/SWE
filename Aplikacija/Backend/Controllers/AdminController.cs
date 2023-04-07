using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    public PPContext Context { get; set; }
    private IConfiguration _config;
    public AdminController(PPContext context,IConfiguration config)
    {
        Context = context;
        _config=config;
    }
    [Route("AddAdmin/{korisnicko_ime}/{lozinka}/{email}/{ime}/{prezime}")]
    [HttpPost]
    public async Task<ActionResult> AddAdmin(string korisnicko_ime,string lozinka, string email,string ime, string prezime)
    {
        try
            {  
                Korisnik k=new Korisnik{
                    KorisnickoIme=korisnicko_ime,
                    Sifra=lozinka,
                    Email=email,
                    Tip="Admin"
                };
                
                 Admin a=new Admin{
                     Ime=ime,
                     Prezime=prezime,
                     Korisnik=k
                    };
                    Context.Admin.Add(a);
                    Context.Korisnik.Add(k);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno dodat admin");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }
    [Route("DodajKategoriju/{naziv}")]
    [HttpPost]
    public async Task<ActionResult> DodajKategoriju(string naziv)
    {
        try
            {  
                Kategorija k = new Kategorija{
                    Naziv=naziv
                };
                Context.Kategorija.Add(k);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata kategorija");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }
    [Route("ObrisiKategoriju/{id_kategorija}")]
    [HttpPost]
    public async Task<ActionResult> ObrisiKategoriju(int id_kategorija)
    {
        try
            {  
                Kategorija k = await Context.Kategorija.FindAsync(id_kategorija);
                Context.Kategorija.Remove(k);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana kategorija");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }
}