using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;

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

        [Route("RegistracijaKlijent/{korisnicko_ime}/{lozinka}/{email}/{tip}")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> RegistracijaKlijent(string korisnicko_ime,string email,string lozinka,string ime,string prezime,string adresa,string broj,string grad)
        {
            if(await Context.Korisnici.Where(p=>p.korisnickoIme==korisnicko_ime).FirstOrDefaultAsync()!=null) return BadRequest("Korisnicko ime zauzeto");
            if(await Context.Korisnici.Where(p=>p.email==email).FirstOrDefaultAsync()!=null) return BadRequest("Email je zauzet");
            return null;
        }
}