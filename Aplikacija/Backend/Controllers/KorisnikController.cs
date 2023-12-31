using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Net.Http.Headers;
using System.Web;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public PPContext Context { get; set; }
    private IConfiguration _config;
    public KorisnikController(PPContext context, IConfiguration config)
    {
        Context = context;
        _config = config;
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
            new Claim(ClaimTypes.NameIdentifier,korisnik.ID.ToString())
        };

        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        _config["Jwt:Audience"],
        claims,
        expires: DateTime.Now.AddMinutes(60),
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
        if (Identitet != null)
        {
            var Tvrdnja = Identitet.Claims;
            return new Korisnik
            {
                korisnickoIme = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.GivenName)?.Value,
                email = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.Email)?.Value,
                tip = Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.Role)?.Value,
                ID = int.Parse(Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.Name)?.Value)
            };
        }
        return null;
    }

    [Route("RegistracijaKlijent/{korisnicko_ime}/{lozinka}/{email}/{ime}/{prezime}/{adresa}/{broj}/{grad}")]
    [HttpPost]
    //[AllowAnonymous]
    public async Task<ActionResult> RegistracijaKlijent(string korisnicko_ime, string lozinka, string email, string ime, string prezime, string adresa, string broj, string grad)
    {
        if (string.IsNullOrWhiteSpace(korisnicko_ime))
            return BadRequest("Korisnicko ime nije validno");
        if (string.IsNullOrWhiteSpace(lozinka))
            return BadRequest("Lozinka nije validna");
        if (string.IsNullOrWhiteSpace(email) || email.Length > 60)
            return BadRequest("Email nije validan");
        if (string.IsNullOrWhiteSpace(grad))
            return BadRequest("Grad nije validan");
        if (string.IsNullOrWhiteSpace(ime) || ime.Length > 30)
            return BadRequest("Ime nije validno");
        if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 60)
            return BadRequest("Prezime nije validno");
        if (string.IsNullOrWhiteSpace(broj) || broj.Length > 13)
            return BadRequest("Broj nije validan");

        if (await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime).FirstOrDefaultAsync() != null) return BadRequest("Korisnicko ime zauzeto");
        if (await Context.Korisnici.Where(p => p.email == email).FirstOrDefaultAsync() != null) return BadRequest("Email je zauzet");

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
            Korisnik k = new Korisnik
            {
                korisnickoIme = korisnicko_ime,
                sifra = hashed,
                email = email,
                tip = "Klijent",
                salt_value = salt,
            };
            Klijent kl = new Klijent
            {
                ime = ime,
                prezime = prezime,
                adresa = adresa,
                grad = grad,
                brojTelefona = broj,
                Korisnik = k
            };
            Korpa kor = new Korpa
            {
                Klijent = kl
            };
            Context.Korisnici.Add(k);
            Context.Klijenti.Add(kl);
            Context.Korpe.Add(kor);
            await Context.SaveChangesAsync();
            return Ok($"ID kreirane korpe je: {kor.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("RegistracijaSalon/{korisnicko_ime}/{lozinka}/{email}/{naziv}/{grad}/{adresa}/{broj}")]
    [HttpPost]
    //[AllowAnonymous]
    public async Task<ActionResult> RegistracijaSalon(string korisnicko_ime, string lozinka, string email, string naziv, string grad, string adresa, string broj)
    {
        if (string.IsNullOrWhiteSpace(korisnicko_ime))
            return BadRequest("Korisnicko ime nije validno");
        if (string.IsNullOrWhiteSpace(lozinka))
            return BadRequest("Lozinka nije validna");
        if (string.IsNullOrWhiteSpace(email) || email.Length > 60)
            return BadRequest("Email nije validan");
        if (string.IsNullOrWhiteSpace(grad))
            return BadRequest("Grad nije validan");
        if (string.IsNullOrWhiteSpace(naziv))
            return BadRequest("Naziv nije validan");
        if (string.IsNullOrWhiteSpace(broj) || broj.Length > 13)
            return BadRequest("Broj nije validan");

        if (await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime).FirstOrDefaultAsync() != null) return BadRequest("Korisnicko ime zauzeto");
        if (await Context.Korisnici.Where(p => p.email == email).FirstOrDefaultAsync() != null) return BadRequest("Email je zauzet");

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
            Korisnik k = new Korisnik
            {
                korisnickoIme = korisnicko_ime,
                sifra = hashed,
                email = email,
                tip = "Salon",
                salt_value = salt,
            };
            Salon s = new Salon
            {
                naziv = naziv,
                adresa = adresa,
                grad = grad,
                brojTelefona = broj,
                Korisnik = k,
            };
            Context.Korisnici.Add(k);
            Context.Saloni.Add(s);
            await Context.SaveChangesAsync();
            return Ok(true);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("Login/{korisnicko_ime}/{lozinka}")]
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string korisnicko_ime, string lozinka)
    {
        try
        {
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


    [Route("IzmeniLozinku/{korisnicko_ime}/{lozinka}/{NovaLozinka}")]
    [HttpPut]
    [Authorize]
    public async Task<ActionResult> IzmeniLozinku(string korisnicko_ime, string lozinka, string NovaLozinka)
    {
        if (string.IsNullOrWhiteSpace(korisnicko_ime) || korisnicko_ime.Length > 60)
            return BadRequest("Email nije validan");

        if (string.IsNullOrWhiteSpace(lozinka))
            return BadRequest("Lozinka nije validna");

        if (string.IsNullOrWhiteSpace(NovaLozinka) && lozinka.CompareTo(NovaLozinka) == 0)
            return BadRequest("Lozinka nije validna");


        Korisnik Current = Context.Korisnici.FirstOrDefault(p => p.korisnickoIme.ToLower() == korisnicko_ime.ToLower());

        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(

        password: lozinka,

        salt: Current.salt_value,

        prf: KeyDerivationPrf.HMACSHA256,

        iterationCount: 100000,

        numBytesRequested: 256 / 8));

        if (Current.sifra.CompareTo(hashed) == 0)
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
                var p = await Context.Korisnici.Where(p => p.korisnickoIme.ToLower() == korisnicko_ime.ToLower()).FirstOrDefaultAsync();
                if (p == null) return Ok("Ne postoji taj korisnik");
                Current.sifra = hashed;
                Current.salt_value = salt;
                await Context.SaveChangesAsync();
                return Ok("Promenjena lozinka!");
            }
            catch (Exception)
            {
                return Ok(false);
            }
        }
        else return Ok("Nisu unete dobre lozinke!");
    }

    [HttpPost]
    [Route("Upload/{korisnicko_ime}")]
    [Authorize]
    public async Task<IActionResult> Upload(string korisnicko_ime)
    {
        try
        {
            Korisnik retVal = Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime).FirstOrDefault();
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var uniqueFileName = GetUniqueFileName(file.FileName);
                var fullPath = Path.Combine(pathToSave, uniqueFileName);
                var dbPath = Path.Combine(folderName, uniqueFileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
                dbPath = $"{baseUrl}/{dbPath.Replace("\\", "/")}";

                retVal.slika = dbPath;
                await Context.SaveChangesAsync();
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e}");
        }
    }

    private string GetUniqueFileName(string fileName)
    {
        var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
        var randomString = Path.GetRandomFileName().Replace(".", "");
        var extension = Path.GetExtension(fileName);
        return $"{timestamp}_{randomString}{extension}";
    }

    [HttpGet]
    [Route("PrikaziKorisnike")]
    public IActionResult PrikaziKorisnike()
    {
        try
        {
            var korisnici = Context.Korisnici.ToList();

            var rezultat = new List<object>();

            foreach (var k in korisnici)
            {
                if (k.tip == "Klijent")
                {
                    var klijent = Context.Klijenti.FirstOrDefault(kl => kl.Korisnik.ID == k.ID);
                    if (klijent != null)
                    {
                        var obj = new
                        {
                            k.ID,
                            k.email,
                            k.korisnickoIme,
                            k.tip,
                            k.slika,
                            klijent.ime,
                            klijent.prezime,
                            klijent.adresa,
                            klijent.grad,
                            klijent.brojTelefona
                        };

                        rezultat.Add(obj);
                    }
                }
                else if (k.tip == "Salon")
                {
                    var salon = Context.Saloni.FirstOrDefault(kl => kl.Korisnik.ID == k.ID);
                    if (salon != null)
                    {
                        var obj = new
                        {
                            k.ID,
                            k.email,
                            k.korisnickoIme,
                            k.tip,
                            k.slika,
                            salon.naziv,
                            salon.adresa,
                            salon.grad,
                            salon.brojTelefona
                        };

                        rezultat.Add(obj);
                    }
                }
                else
                {
                    var obj = new
                    {
                        k.ID,
                        k.email,
                        k.korisnickoIme,
                        k.tip,
                        k.slika
                    };

                    rezultat.Add(obj);
                }
            }

            return Ok(rezultat);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }




}