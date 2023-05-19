using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
//[Authorize(Roles ="Salon")]
public class SalonController : ControllerBase
{
    public PPContext Context { get; set; }
    public SalonController(PPContext context)
    {
        Context = context;
    }

    [Route("VratiSveSalone")]
    [HttpGet]
    //[AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> VratiSveSalone()
    {
        var saloni = await Context.Saloni.Include(s => s.Korisnik).ToListAsync();

        var result = saloni.Select(s => new
        {
            id = s.ID,
            naziv = s.naziv,
            adresa = s.adresa,
            grad = s.grad,
            // prosecnaOcena = s.ProsecnaOcena,
            brojTelefona = s.brojTelefona,
            slika = s.Korisnik.slika
        });
        return Ok(result);
    }

    [Route("VratiSalon/{id_salon}")]
    [HttpGet]
    //[AllowAnonymous]
    public async Task<ActionResult<Salon>> VratiSalon(int id_salon)
    {
        var salon = await Context.Saloni.Include(s => s.Korisnik).FirstOrDefaultAsync(s => s.ID == id_salon);
        // s.ID = id_salon;
        if (salon == null)
            return NotFound();
        return salon;
    }

    [Route("VratiSalonPrekoKI/{korisnicko_ime}")]
    [HttpGet]
    public async Task<ActionResult<object>> VratiSalonPrekoKI(string korisnicko_ime)
    {
        Korisnik korisnik = Context.Korisnici.FirstOrDefault(s => s.korisnickoIme == korisnicko_ime);
        Salon salon = await Context.Saloni.Include(s => s.Korisnik).FirstOrDefaultAsync(s => s.Korisnik.ID == korisnik.ID);

        if (salon != null)
        {
            var rezultat = new
            {
                SalonId = salon.ID,
                Salon = salon
            };

            return rezultat;
        }

        return NotFound();
    }


    [Route("IzmeniProfilSalona/{korisnicko_ime}/{naziv}/{adresa}/{grad}/{brojTelefona}")]
    [HttpPut]
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Salon>> IzmeniProfil(string korisnicko_ime, string naziv, string adresa, string grad, string brojTelefona)
    {
        //nadjes na osnovu korisnika
        var k = await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime).FirstOrDefaultAsync();
        if (k == null)
            return NotFound();
        var s = await Context.Saloni.Where(p => p.Korisnik == k).FirstOrDefaultAsync();
        try
        {
            s.naziv = naziv;
            s.adresa = adresa;
            s.grad = grad;
            s.brojTelefona = brojTelefona;
            await Context.SaveChangesAsync();
            return Ok(s);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("OdgovoriNaPitanje/{id_pitanje}/{tekst}")]
    [HttpPut]
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Pitanje>> OdgovoriNaPitanje(int id_pitanje, string tekst)
    {
        try
        {
            Pitanje p = await Context.Pitanja.FindAsync(id_pitanje);
            if (p == null)
                return NotFound();
            if (p.tekstO == null)
                p.tekstO = tekst;
            else
                return BadRequest("Odgovoreno pitanje!");
            p.datumOdgovaranja = DateTime.Now;
            await Context.SaveChangesAsync();
            return Ok(p);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut("ObradiZahtev/{id_zahtev}/{status}/{komentarSalona}")]
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Zahtev>> ObradiZahtev(int id_zahtev, string status, string komentarSalona)
    {
        try
        {
            var zahtev = await Context.Zahtevi.FindAsync(id_zahtev);
            if (zahtev.status != "Neobrađen")
                return BadRequest("Zahtev je obradjen!");
            if (zahtev != null)
            {
                zahtev.status = status;
                zahtev.komentarSalona = komentarSalona;
                Context.Zahtevi.Update(zahtev);
            }
            await Context.SaveChangesAsync();
            return Ok($"ID obrađenog zahteva je: {id_zahtev}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    [HttpPut("ObradiNarudzbinu/{id_narudzbina}/{status}/{komentar_salona}")]
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Narudzbina>> ObradiNarudzbinu(int id_narudzbina, string status, string komentar_salona)
    {
        try
        {
            var narudzbina = await Context.Narudzbine.FindAsync(id_narudzbina);
            if (narudzbina.status != "Neobrađena")
                return BadRequest("Narudzbina je vec obradjena!");
            if (narudzbina != null)
            {
                narudzbina.status = status;
                narudzbina.komentarSalona = komentar_salona;
                Context.Narudzbine.Update(narudzbina);
            }
            await Context.SaveChangesAsync();
            return Ok($"ID obrađene narudžbine je: {id_narudzbina}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("VratiPitanjaSalona/{id_salon}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> VratiPitanjaSalona(int id_salon)
    {
        var pitanja = await Context.Pitanja
        .Where(p => p.Salon.ID == id_salon)
        .Include(p => p.Salon)
        .Include(p => p.Klijent)
        .ThenInclude(k=>k.Korisnik)
        .Select(p => new
        {
            id = p.ID,
            SalonNaziv = p.Salon.naziv,
            KlijentImePrezime = p.Klijent.ime + " " + p.Klijent.prezime,
            tekstP = p.tekstP,
            tekstO = p.tekstO,
            datumPostavljanja = p.datumPostavljanja,
            datumOdgovaranja = p.datumOdgovaranja,
            slikaKlijenta = p.Klijent.Korisnik.slika,
            slikaSalona = p.Salon.Korisnik.slika
        })
        .ToListAsync();

        return pitanja;
    }

    [Route("VratiRecenzijeSalona/{id_salon}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> VratiRecenzijeSalona(int id_salon)
    {
        var recenzije = await Context.Recenzije
        .Where(r => r.Salon.ID == id_salon)
        .Include(r => r.Klijent)
        .ThenInclude(k=>k.Korisnik)
        .Select(r => new
        {
            SalonNaziv = r.Salon.naziv,
            KlijentImePrezime = r.Klijent.ime + " " + r.Klijent.prezime,
            ocena = r.ocena,
            tekst = r.tekst,
            datumPostavljanja = r.datum,
            slika = r.Klijent.Korisnik.slika
        })
        .ToListAsync();
        return recenzije;
    }

    [Route("VratiNarudzbineSalona/{korisnicko_ime}")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> VratiNarudzbineSalona(string korisnicko_ime)
    {
        Korisnik korisnik = Context.Korisnici.FirstOrDefault(k => k.korisnickoIme == korisnicko_ime);
        Salon salon = await Context.Saloni.Include(s => s.Korisnik).FirstOrDefaultAsync(s => s.Korisnik.ID == korisnik.ID);
        if (salon == null)
        {
            return NotFound($"Salon sa korisničkim imenom {korisnicko_ime} nije pronađen.");
        }

        List<Narudzbina> narudzbine = await Context.Narudzbine
        .Include(n => n.Salon)
        .Include(n => n.Klijent)
        .Where(n => n.Salon.ID == salon.ID)
        .ToListAsync();

        var rezultat = narudzbine.Select(n => new
        {
            NarudzbinaID = n.ID,
            Status = n.status,
            KomentarSalona = n.komentarSalona,
            UkupnaCena = n.ukupnaCena,
            Datum = n.datum,
            KorisnickoIme = n.korisnickoIme,
            Grad = n.grad,
            Adresa = n.adresa,
            Klijent = new
            {
                ID = n.Klijent.ID,
                ime = n.Klijent.ime,
                prezime = n.Klijent.prezime,
                brojTelefona = n.Klijent.brojTelefona
            }
        });

        return Ok(rezultat);
    }

    [Route("VratiZahteveSalona/{korisnicko_ime}")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> VratiZahteveSalona(string korisnicko_ime)
    {
        Korisnik korisnik = Context.Korisnici.FirstOrDefault(k => k.korisnickoIme == korisnicko_ime);
        Salon salon = await Context.Saloni.Include(s => s.Korisnik).FirstOrDefaultAsync(s => s.Korisnik.ID == korisnik.ID);
        if (salon == null)
        {
            return NotFound($"Salon sa korisničkim imenom {korisnicko_ime} nije pronađen.");
        }

        List<Zahtev> zahtevi = await Context.Zahtevi
        .Include(n => n.Salon)
        .Include(n => n.Klijent)
        .Where(n => n.Salon.ID == salon.ID)
        .ToListAsync();

        var rezultat = zahtevi.Select(z => new
        {
            ZahtevID = z.ID,
            ImeLjubimca = z.imeLjubimca,
            Zivotinja = z.zivotinja,
            Cena = z.cena,
            DatumVreme = z.datumVreme,
            Status = z.status,
            KomentarSalona = z.komentarSalona,
            Klijent = new
            {
                ID = z.Klijent.ID,
                ime = z.Klijent.ime,
                prezime = z.Klijent.prezime,
                adresa = z.Salon.adresa,
                grad = z.Salon.grad,
                brojTelefona = z.Klijent.brojTelefona
            }
        });

        return Ok(rezultat);
    }


    [Route("ProsecnaOcena/{id_salon}")]
    [HttpGet]
    public async Task<ActionResult<object>> ProsecnaOcena(int id_salon)
    {
        var salon = await Context.Saloni.Include(s => s.Recenzije).FirstOrDefaultAsync(s => s.ID == id_salon);

        if (salon == null)
            return NotFound();

        float prosecnaOcena = 0;
        if (salon.Recenzije != null && salon.Recenzije.Count > 0)
        {
            prosecnaOcena = salon.Recenzije.Average(r => r.ocena);
        }

        var rezultat = new
        {
            Salon = salon,
            ProsecnaOcena = prosecnaOcena
        };

        return rezultat;
    }



}