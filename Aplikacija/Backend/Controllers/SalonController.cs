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
        try{
            Pitanje p = await Context.Pitanja.FindAsync(id_pitanje);
            if(p==null)
                return NotFound();
            p.tekstO = tekst;
            p.datumOdgovaranja = DateTime.Now;
            await Context.SaveChangesAsync();
            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut("ObradiZahtev/{zahtevID}/{status}/{komentarSalona}")]
    public async Task<ActionResult<Zahtev>> ObradiZahtev(int zahtevID, string status, string komentarSalona)
    {
        try
        {
            var stariZahtev = await Context.Zahtevi.FindAsync(zahtevID);
            if (stariZahtev != null)
            {
                stariZahtev.status = status; 
                stariZahtev.komentarSalona = komentarSalona;
                Context.Zahtevi.Update(stariZahtev);
            }
            await Context.SaveChangesAsync();
            return Ok($"ID obrađenog zahteva je: {zahtevID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    

    [HttpPut("ObradiNarudzbinu/{narudzbinaID}/{status}")]
    public async Task<ActionResult<Narudzbina>> ObradiNarudzbinu(int narudzbinaID, string status)
    {
        try
        {
            var staraNarudzbina = await Context.Narudzbine.FindAsync(narudzbinaID);
            if (staraNarudzbina != null)
            {
                staraNarudzbina.status = status; //salon menja samo status
                Context.Narudzbine.Update(staraNarudzbina);
            }
            await Context.SaveChangesAsync();
            return Ok("ID obrađene narudžbine je: {narudzbinaID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // //da salon preuzme zahteve
    // [HttpGet("PreuzmiZahteve")]

    // public async Task<ActionResult> PreuzmiZahteve()
    // {
    //     try
    //     {
    //         return Ok(await Context.Zahtevi.ToListAsync());
    //     }
    //     catch (Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

    // [HttpGet("PreuzmiNarudzbine")]

    // public async Task<ActionResult> PreuzmiNarudzbine()
    // {
    //     try
    //     {
    //         return Ok(await Context.Narudzbine.ToListAsync());
    //     }
    //     catch (Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

    // [HttpGet("PreuzmiRecenzije")]

    // public async Task<ActionResult> PreuzmiRecenzije()
    // {
    //     try
    //     {
    //         return Ok(await Context.Recenzije.ToListAsync());
    //     }
    //     catch (Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }
}