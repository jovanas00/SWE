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

    [HttpPost("PošaljiZahtev/{imeLjubimca}/{zivotinja}")]//a koja je usluga, to treba iz klase usluga??
    public async Task<ActionResult<Zahtev>> PošaljiZahtev(string imeLjubimca, string zivotinja) 
    {
        try
        {
            Zahtev z = new Zahtev{
                imeLjubimca = imeLjubimca,
                zivotinja = zivotinja,
                cena = 0, //ovo mora da se postavi na početku, posle salon menja..
                datumVreme = DateTime.Now,
                status = "Neobrađen",
                komentarSalona = "Sačekajte odgovor salona."//i ovo
            };
                Context.Zahtevi.Add(z);
                await Context.SaveChangesAsync();
                return Ok($"ID dodatog zahteva je: {z.ID}");

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    /*[HttpPost("PošaljiZahtev")]
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
        
    }*/


    //treba funkcija završi sa kupovinom, da se napravi narudžbina na osnovu korpe

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
                return Ok($"ID obrisanog zahteva je: {idZahteva}");
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

    [HttpPost("OceniSalon/{idSalona}/{tekst}/{ocena}")]
    public async Task<ActionResult<Recenzija>> OceniSalon(int idSalona, string tekst, float ocena) 
    {
        try
        {
            var salon = await Context.Saloni.FindAsync(idSalona);

            if (salon != null)
            {   
                Recenzija r = new Recenzija{
                    tekst = tekst,
                    ocena = ocena,
                    datum = DateTime.Now
                };
                Context.Recenzije.Add(r);
                await Context.SaveChangesAsync();
                return Ok($"ID dodate recenzije je: {r.ID}");
            }
            else
            {
                return Ok("Nema takvog salona.");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    [HttpPut("DodajUKorpu/{proizvodID}/{korpaID}")]
    public async Task<ActionResult<Korpa>> DodajUKorpu(int proizvodID, int korpaID)
    {
        try
        {
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);

            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null && proizvod != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena + proizvod.cena; 
                Context.Korpe.Update(staraKorpa);
            }
            Context.Proizvodi.Add(proizvod);
            await Context.SaveChangesAsync();
            return Ok($"ID dodatog proizvoda je: {proizvod.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //treba jos u listu da dodaje i izbacuje
    [HttpPut("IzbaciIzKorpe/{proizvodID}/{korpaID}")]
    public async Task<ActionResult<Korpa>> IzbaciIzKorpe(int proizvodID, int korpaID)
    {
        try
        {
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null && proizvod != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena - proizvod.cena; //samo cenu oduzme od ukupne cene?
                Context.Korpe.Update(staraKorpa);
            }
            Context.Proizvodi.Remove(proizvod);
            await Context.SaveChangesAsync();
            return Ok($"ID izbačenog proizvoda je: {proizvod.ID}");
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