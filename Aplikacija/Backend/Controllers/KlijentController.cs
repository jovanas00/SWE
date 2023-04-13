namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class KlijentController : ControllerBase
{
    public PPContext Context { get; set; }
    public KlijentController(PPContext context)
    {
        Context = context;
    }

    // [Route("IzmeniProfilKlijenta/{id_klijent}")]
    // [HttpPut]
    // public async Task<ActionResult<Klijent>> IzmeniProfil(int id_klijent, Klijent noviKlijent)
    // {
    //     var k = await Context.Klijenti.FindAsync(id_klijent);
    //     if(k == null)
    //         return NotFound();
    //     try{
    //         k.ime = noviKlijent.ime;
    //         k.prezime = noviKlijent.prezime;
    //         k.adresa = noviKlijent.adresa;
    //         k.grad = noviKlijent.grad;
    //         k.brojTelefona = noviKlijent.brojTelefona;
    //         await Context.SaveChangesAsync();

    //         return Ok(k);
    //     }
    //     catch(Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

    [Route("IzmeniProfilKlijenta/{korisnicko_ime}/{ime}/{prezime}/{adresa}/{grad}/{brojTelefona}")]
    [HttpPut]
    public async Task<ActionResult<Klijent>> IzmeniProfil(string korisnicko_ime, string ime, string prezime, string adresa, string grad, string brojTelefona)
    {
        var k = await Context.Korisnici.Where(p => p.korisnickoIme == korisnicko_ime ).FirstOrDefaultAsync();
        if(k == null)
            return NotFound();
        var klijent = await Context.Klijenti.Where(p=>p.Korisnik==k).FirstOrDefaultAsync();
        try{
            klijent.ime = ime;
            klijent.prezime = prezime;
            klijent.adresa = adresa;
            klijent.grad = grad;
            klijent.brojTelefona = brojTelefona;
            await Context.SaveChangesAsync();
            return Ok(k);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PostaviPitanje/{tekst}/{id_salon}")]
    [HttpPost]
    public async Task<ActionResult<Klijent>> PostaviPitanje(string tekst, int id_salon)
    {
        Salon s = await Context.Saloni.FindAsync(id_salon);
        if(s==null)
            return BadRequest("Salon ne postoji.");
        try{
            Pitanje p = new Pitanje{
                tekstP = tekst,
                tekstO = null,
                datumPostavljanja = DateTime.Now,
                datumOdgovaranja = null,
                Salon = s
            };
            Context.Pitanja.Add(p);
            await Context.SaveChangesAsync();

            return Ok(p);
        }
        catch(Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost("PošaljiZahtev")]
    public async Task<IActionResult> PošaljiZahtev([FromBody] Zahtev zahtev) 
    {
        try
        {
            await Context.Zahtevi.AddAsync(zahtev);
            await Context.SaveChangesAsync();
            return Ok($"ID dodatog zahteva je: {zahtev.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    [HttpDelete("ObrisiZahtev/{idZahteva}")]
    public async Task<ActionResult> ObrišiZahtev(int idZahteva)
    {
        try
        {
            var zahtev = await Context.Zahtevi.FindAsync(idZahteva);
            
            if (zahtev != null)
            {
                Context.Zahtevi.Remove(zahtev);
                await Context.SaveChangesAsync();
                return Ok($"ID dodatog zahteva je: {idZahteva}");
            } 
            else
            {
                return BadRequest("Nije pronađen zahtev!");
            }          
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("OceniSalon")]
    public async Task<IActionResult> OceniSalon([FromBody] Recenzija recenzija) 
    {
        try
        {
            await Context.Recenzije.AddAsync(recenzija);
            await Context.SaveChangesAsync();
            return Ok($"ID recenzije je: {recenzija.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    [HttpPut("DodajUKorpu/{korpaID}")]
    public async Task<ActionResult> DodajUKorpu([FromBody]Korpa korpa, int korpaID)
    {
        try
        {
            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena + korpa.ukupnaCena; //valjda može ovako
                //samo ukupna cena ima
                Context.Korpe.Update(staraKorpa);
            }
            await Context.SaveChangesAsync();
            return Ok("Korpa je ažurirana.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzbaciIzKorpe/{korpaID}")]
    public async Task<ActionResult> IzbaciIzKorpe([FromBody]Korpa korpa, int korpaID)
    {
        try
        {
            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena - korpa.ukupnaCena; //samo cenu oduzme od ukupne cene?
                Context.Korpe.Update(staraKorpa);
            }
            await Context.SaveChangesAsync();
            return Ok("Korpa je ažurirana.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //Naruči narudžbinu, manja status na "neobrađen" i šalje salonu?
    [HttpPut("Naruci/{narudzbinaID}")]
    public async Task<ActionResult> Naruci([FromBody]Narudzbina narudzbina, int narudzbinaID)
    {
        try
        {
            var staraNarudzbina = await Context.Narudzbine.FindAsync(narudzbinaID);
            if (staraNarudzbina != null)
            {
                staraNarudzbina.status = "Neobrađena"; //salonu se šalje narudžbina kao neobrađena
                Context.Narudzbine.Update(staraNarudzbina);
            }
            await Context.SaveChangesAsync();
            return Ok("Narudžbina je poslata salonu");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



}