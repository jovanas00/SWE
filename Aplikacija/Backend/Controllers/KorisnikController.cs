using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Net.Http.Headers;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public PPContext Context { get; set; }
    private IConfiguration _config;
    public  KorisnikController(PPContext context,IConfiguration config)
    {
        Context = context;
        _config=config;
    }
    private string Generate(Korisnik korisnik) // Generisanje tokena
    {
        var Kljuc = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var Podaci = new SigningCredentials(Kljuc, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.GivenName, korisnik.korisnickoIme),
            new Claim(ClaimTypes.Email ,korisnik.email),
            new Claim(ClaimTypes.Role, korisnik.tip),
        };

        if (korisnik.tip == "Klijent")
        {
            var klijent = Context.Klijenti.FirstOrDefault(k => k.Korisnik.ID == korisnik.ID);
            var korpa = Context.Korpe.FirstOrDefault(k=>k.Klijent.ID==klijent.ID);
            if (klijent != null)
            {
                claims.Add(new Claim("KlijentID", klijent.ID.ToString()));
                claims.Add(new Claim("KorpaID", korpa.ID.ToString()));
            }
        }
        else if (korisnik.tip == "Salon")
        {
            var salon = Context.Saloni.FirstOrDefault(s => s.Korisnik.ID == korisnik.ID);
            if (salon != null)
            {
                claims.Add(new Claim("SalonID", salon.ID.ToString()));
            }
        }

        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        _config["Jwt:Audience"],
        claims,
        expires:DateTime.Now.AddMinutes(60),
        signingCredentials: Podaci);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private Korisnik Authenticate(string korisnicko_ime, string lozinka) // Autentifikacija
    {
        Korisnik Current = Context.Korisnici.FirstOrDefault(p => p.korisnickoIme.ToLower() == korisnicko_ime.ToLower());
        
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(

        password: lozinka,

        salt: Current.salt_value,

        prf: KeyDerivationPrf.HMACSHA256,

        iterationCount: 100000,

        numBytesRequested: 256 / 8));

        if (Current != null && Current.sifra == hashed)
            return Current;
        else
            return null;
    }

    private Korisnik VratiKorisnika()
    {
        var Identitet = HttpContext.User.Identity as ClaimsIdentity;
        if(Identitet != null)
        {
            var Tvrdnja = Identitet.Claims;
            return new Korisnik{
                korisnickoIme = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.GivenName)?.Value,
                email = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.Email)?.Value,
                tip = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.Role)?.Value
            };
        }
        return null;
    }

    [Route("RegistracijaKlijent/{korisnicko_ime}/{lozinka}/{email}/{ime}/{prezime}/{adresa}/{broj}/{grad}")]
    [HttpPost]
    //[AllowAnonymous]
    public async Task<ActionResult> RegistracijaKlijent(string korisnicko_ime,string lozinka,string email,string ime,string prezime,string adresa,string broj,string grad)
    {
        //dodatna ogranicenja...
        if(string.IsNullOrWhiteSpace(korisnicko_ime))
            return BadRequest("Korisnicko ime nije validno");
            if(string.IsNullOrWhiteSpace(lozinka))
            return BadRequest("Lozinka nije validna");   
        if(string.IsNullOrWhiteSpace(email) ||  email.Length > 60)
            return BadRequest("Email nije validan");   
        if(string.IsNullOrWhiteSpace(grad))
            return BadRequest("Grad nije validan");
        if(string.IsNullOrWhiteSpace(ime) ||  ime.Length > 30)
            return BadRequest("Ime nije validno");   
        if(string.IsNullOrWhiteSpace(prezime) ||  prezime.Length > 60)
            return BadRequest("Prezime nije validno"); 
        if(string.IsNullOrWhiteSpace(broj) ||  broj.Length > 13)
            return BadRequest("Broj nije validan"); 

        if(await Context.Korisnici.Where(p=>p.korisnickoIme==korisnicko_ime).FirstOrDefaultAsync()!=null) return BadRequest("Korisnicko ime zauzeto");
        if(await Context.Korisnici.Where(p=>p.email==email).FirstOrDefaultAsync()!=null) return BadRequest("Email je zauzet");

        lozinka=lozinka.Replace("01abfc750a0c942167651c40d088531d","#");

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
                    korisnickoIme=korisnicko_ime.Replace("01abfc750a0c942167651c40d088531d","#"),
                    sifra=hashed,
                    email=email,
                    tip="Klijent",
                    salt_value = salt,
                    };
                Klijent kl=new Klijent{
                    ime=ime.Replace("01abfc750a0c942167651c40d088531d",""),
                    prezime=prezime.Replace("01abfc750a0c942167651c40d088531d",""),
                    adresa=adresa,
                    grad=grad,
                    brojTelefona=broj,
                    Korisnik=k
                };
                Korpa kor = new Korpa{
                //ukupnaCena=0,
                Klijent = kl
                };
                Context.Korisnici.Add(k);
                Context.Klijenti.Add(kl);
                Context.Korpe.Add(kor);
                await Context.SaveChangesAsync();
                return Ok($"ID kreirane korpe je: {kor.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }

    [Route("RegistracijaSalon/{korisnicko_ime}/{lozinka}/{email}/{naziv}/{grad}/{adresa}/{broj}")]
    [HttpPost]
    //[AllowAnonymous]
    public async Task<ActionResult> RegistracijaSalon(string korisnicko_ime,string lozinka,string email,string naziv,string grad,string adresa,string broj)
    {
        if(string.IsNullOrWhiteSpace(korisnicko_ime))
        return BadRequest("Korisnicko ime nije validno");
        if(string.IsNullOrWhiteSpace(lozinka))
        return BadRequest("Lozinka nije validna");   
        if(string.IsNullOrWhiteSpace(email) ||  email.Length > 60)
            return BadRequest("Email nije validan");   
        if(string.IsNullOrWhiteSpace(grad))
            return BadRequest("Grad nije validan");
        if(string.IsNullOrWhiteSpace(naziv))
            return BadRequest("Naziv nije validan");   
        if(string.IsNullOrWhiteSpace(broj) ||  broj.Length > 13)
            return BadRequest("Broj nije validan"); 

        if(await Context.Korisnici.Where(p=>p.korisnickoIme==korisnicko_ime).FirstOrDefaultAsync()!=null) return BadRequest("Korisnicko ime zauzeto");
        if(await Context.Korisnici.Where(p=>p.email==email).FirstOrDefaultAsync()!=null) return BadRequest("Email je zauzet");

        lozinka=lozinka.Replace("01abfc750a0c942167651c40d088531d","#");

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
                    korisnickoIme=korisnicko_ime.Replace("01abfc750a0c942167651c40d088531d","#"),
                    sifra=hashed,
                    email=email,
                    tip="Salon",
                    salt_value = salt,
                    };
                Salon s=new Salon{
                    naziv=naziv,
                    adresa=adresa,
                    grad=grad,
                    brojTelefona=broj,
                    Korisnik=k,
                    //prosecnaOcena=0,
                };
                Context.Korisnici.Add(k);
                Context.Saloni.Add(s);
                await Context.SaveChangesAsync();
                return Ok(true);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }

    [Route("Login/{korisnicko_ime}/{lozinka}")]      
    [HttpGet]
    //[AllowAnonymous]
    public async Task<IActionResult> Login(string korisnicko_ime, string lozinka)
    {
        try
        {
            lozinka = lozinka.Replace("01abfc750a0c942167651c40d088531d", "#");
            Korisnik korisnik = Authenticate(korisnicko_ime, lozinka);
            if (korisnik != null)
            {
                var token = Generate(korisnik);
                var response = new { Token = token }; // token and user information
                return Ok(response);
            }
    
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }


    [Route("IzmeniLozinku/{email}/{lozinka}/{NovaLozinka}")]
    [HttpPut]
    //[AllowAnonymous]
    public async Task<ActionResult> IzmeniLozinku(string email, string lozinka, string NovaLozinka)
    {
        
            if(string.IsNullOrWhiteSpace(email) || email.Length > 60)
            return BadRequest("Email nije validan");

            if(string.IsNullOrWhiteSpace(lozinka))
            return BadRequest("Lozinka nije validna");   

            if(string.IsNullOrWhiteSpace(NovaLozinka) && lozinka.CompareTo(NovaLozinka)==0)
            return BadRequest("Lozinka nije validna");  
            

        Korisnik Current = Context.Korisnici.FirstOrDefault(p => p.email.ToLower() == email.ToLower());
        lozinka=lozinka.Replace("01abfc750a0c942167651c40d088531d","#");

        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(

        password: lozinka,

        salt: Current.salt_value,

        prf: KeyDerivationPrf.HMACSHA256,

        iterationCount: 100000,

        numBytesRequested: 256 / 8));

        if(Current.sifra.CompareTo(hashed)==0)
        {
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
        
        // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: NovaLozinka,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
            try
            {
                var p = await Context.Korisnici.Where(p => p.email.ToLower() == email.ToLower() ).FirstOrDefaultAsync();
                if(p==null) return Ok("Ne postoji taj korisnik");
                    p.sifra=hashed;
                    p.salt_value = salt;
                await Context.SaveChangesAsync();
                return Ok(true);   
            } 
            catch (Exception)
        {
                return Ok(false);
            }
        }
        else return Ok();
    }

    [HttpPost]
    [Route("Upload/{korisnicko_ime}")]
    public async Task<IActionResult> Upload(string korisnicko_ime)
    {   
        //forma na forntendu mora da bi se testiralo!
        try
        {
            Korisnik obj = VratiKorisnika();
            Korisnik retVal = Context.Korisnici.Where(p=>p.korisnickoIme==korisnicko_ime).FirstOrDefault();
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var folderName = Path.Combine("Resources","Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);

            if(file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave,fileName);
                var dbPath = Path.Combine(folderName,fileName);
                using(var stream = new FileStream(fullPath,FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                retVal.slika=dbPath;
                await Context.SaveChangesAsync();
                return Ok(new {dbPath});
            }
            else
            {
                return BadRequest();
            }
        }
        catch(Exception e)
        {
            return StatusCode(500, $"Internal server error: {e}");
        }
    }
}