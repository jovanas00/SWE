using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
//[Authorize(Roles = "Admin")]
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
        byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
           
            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: lozinka,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
        try
            {  
                Korisnik k=new Korisnik{
                    korisnickoIme=korisnicko_ime,
                    sifra=hashed,
                    email=email,
                    salt_value=salt,
                    tip="Admin"
                };
                
                 Admin a=new Admin{
                     ime=ime,
                     prezime=prezime,
                     Korisnik=k
                    };
                    Context.Admini.Add(a);
                    Context.Korisnici.Add(k);
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
                    naziv=naziv
                };
                Context.Kategorije.Add(k);
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
                Kategorija k = await Context.Kategorije.FindAsync(id_kategorija);
                Context.Kategorije.Remove(k);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana kategorija");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }
}