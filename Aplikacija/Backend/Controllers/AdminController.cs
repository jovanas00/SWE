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

    [Route("DodajAdmina/{korisnicko_ime}/{lozinka}/{email}/{ime}/{prezime}")]
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

    [Route("IzmeniAdmina/{korisnicko_ime}/{ime}/{prezime}")]
    [HttpPut]
     public async Task<ActionResult> IzmeniAdmina(string korisnicko_ime,string ime, string prezime)
    {
        try
        {    
            Korisnik k = await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime ).FirstOrDefaultAsync();
            if(k==null) return Ok(false);  
                k.korisnickoIme=korisnicko_ime;
            Admin a = await Context.Admini.Where(p=>p.Korisnik==k).FirstOrDefaultAsync(); 
            a.ime=ime;
            a.prezime=prezime;
            await Context.SaveChangesAsync();
            return Ok("Uspesno izmenjen admin");
        }
        catch (Exception e)
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

    [Route("ObrisiKorisnika/{korisnicko_ime}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiKorisnika(string korisnicko_ime)
    {
        try
        {
            Korisnik za_brisanje = Context.Korisnici.FirstOrDefault(k=>k.korisnickoIme.ToLower()==korisnicko_ime.ToLower());
            if(za_brisanje!=null)
            {
                switch(za_brisanje.tip)
                {
                    case "Salon":
                    break;

                    case "Klijent":
                    var klijent = Context.Klijenti.Include(k=>k.Korisnik).FirstOrDefault(k=>k.Korisnik.ID==za_brisanje.ID);
                    var korpa = Context.Korpe.Include(k=>k.Klijent).FirstOrDefault(k=>k.Klijent.ID==klijent.ID);
                    List<Narudzbina> narudzbine = await Context.Narudzbine.Include(k=>k.Korpa).Where(k=>k.Korpa.ID==korpa.ID).ToListAsync();
                    if(narudzbine==null)
                    {}
                    else
                    {
                        foreach(Narudzbina n in narudzbine)
                        {
                            Context.Narudzbine.Remove(n);
                            //Console.WriteLine(n.ID);
                        }
                    }
                    //Console.WriteLine(klijent.ID);
                    //Console.WriteLine(korpa.ID);

                    Context.Klijenti.Remove(klijent);
                    Context.Korpe.Remove(korpa);
                    break;
                }
            }
            Context.Korisnici.Remove(za_brisanje);
            await Context.SaveChangesAsync();
            return Ok(true);
        }
        catch(Exception e)
        {
               return Ok(e.ToString());
        }
    }
}