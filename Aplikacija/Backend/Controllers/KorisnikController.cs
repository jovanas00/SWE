using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

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

            var claims = new[]
            {
                new Claim(ClaimTypes.GivenName, korisnik.korisnickoIme),
                new Claim(ClaimTypes.Email ,korisnik.email),
                new Claim(ClaimTypes.Role, korisnik.tip)
            };
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

        [Route("RegistracijaKlijent/{korisnicko_ime}/{lozinka}/{email}/{ime}/{prezime}/{adresa}/{broj}/{grad}")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> RegistracijaKlijent(string korisnicko_ime,string lozinka,string email,string ime,string prezime,string adresa,string broj,string grad)
        {
            //dodatna ogranicenja...
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
                    Context.Korisnici.Add(k);
                    Context.Klijenti.Add(kl);
                    await Context.SaveChangesAsync();
                    return Ok(true);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
        }

        [Route("RegistracijaSalon/{korisnicko_ime}/{lozinka}/{email}/{naziv}/{grad}/{adresa}/{broj}")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> RegistracijaSalon(string korisnicko_ime,string lozinka,string email,string naziv,string grad,string adresa,string broj)
        {
            //dodatna ogranicenja...
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
                       prosecnaOcena=0,
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
        [AllowAnonymous]
        public async Task<string> Login(string korisnicko_ime, string lozinka)
        {
            try
            {
                lozinka = lozinka.Replace("01abfc750a0c942167651c40d088531d","#");
                Korisnik Korisnik = Authenticate(korisnicko_ime, lozinka);
                if(Korisnik != null)
                {
                    var token = Generate(Korisnik);
                    return token;
                }
                else
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
}