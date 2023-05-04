namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class SalonController : ControllerBase
{
    public PPContext Context { get; set; }
    public SalonController(PPContext context)
    {
        Context = context;
    }

    [Route("IzmeniProfilSalona/{korisnicko_ime}/{naziv}/{adresa}/{grad}/{brojTelefona}")]
    [HttpPut]
    public async Task<ActionResult<Salon>> IzmeniProfil(string korisnicko_ime, string naziv, string adresa, string grad, string brojTelefona)
    {
        var k = await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime ).FirstOrDefaultAsync();
        if(k == null)
            return NotFound();
        var s = await Context.Saloni.Where(p=>p.Korisnik==k).FirstOrDefaultAsync();
        try{
            s.naziv = naziv;
            s.adresa = adresa;
            s.grad = grad;
            s.brojTelefona = brojTelefona;
            await Context.SaveChangesAsync();
            return Ok(s);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("OdgovoriNaPitanje/{id_pitanje}/{tekst}")]
    [HttpPut]
    public async Task<ActionResult<Pitanje>> OdgovoriNaPitanje(int id_pitanje, string tekst)
    {
        try
        {
            Pitanje p = await Context.Pitanja.FindAsync(id_pitanje);
            if(p==null)
                return NotFound();
            if(p.tekstO==null)
                p.tekstO = tekst;
            else
                return BadRequest("Odgovoreno pitanje!");
            p.datumOdgovaranja = DateTime.Now;
            await Context.SaveChangesAsync();
            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut("ObradiZahtev/{id_zahtev}/{status}/{komentarSalona}")]
    public async Task<ActionResult<Zahtev>> ObradiZahtev(int id_zahtev, string status, string komentarSalona)
    {
        try
        {
            var zahtev = await Context.Zahtevi.FindAsync(id_zahtev);
            if(zahtev.status!="Neobrađen")
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
    public async Task<ActionResult<Narudzbina>> ObradiNarudzbinu(int id_narudzbina, string status,string komentar_salona)
    {
        try
        {
            var narudzbina = await Context.Narudzbine.FindAsync(id_narudzbina);
            if(narudzbina.status!="Neobrađena")
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
    public async Task<ActionResult<IEnumerable<object>>> VratiPitanjaSalona(int id_salon)
    {
        var pitanja = await Context.Pitanja
        .Where(p => p.Salon.ID == id_salon)
        .Include(p => p.Klijent)
        .Select(p => new {
            SalonNaziv = p.Salon.naziv,
            KlijentImePrezime = p.Klijent.ime + " " + p.Klijent.prezime,
            tekstP = p.tekstP,
            tekstO = p.tekstO,
            datumPostavljanja = p.datumPostavljanja,
            datumOdgovaranja = p.datumOdgovaranja
        })
        .ToListAsync();
        return pitanja;
    }

    [Route("VratiRecenzijeSalona/{id_salon}")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> VratiRecenzijeSalona(int id_salon)
    {
        var recenzije = await Context.Recenzije
        .Where(r => r.Salon.ID == id_salon)
        .Include(r => r.Klijent)
        .Select(r => new {
            SalonNaziv = r.Salon.naziv,
            KlijentImePrezime = r.Klijent.ime + " " + r.Klijent.prezime,
            tekst = r.tekst,
            datumPostavljanja = r.datum
        })
        .ToListAsync();
        return recenzije;
    }
}