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

    [Route("PostaviPitanje/{tekst}/{id_salon}/{id_klijent}")]
    [HttpPost]
    public async Task<ActionResult<Klijent>> PostaviPitanje(string tekst, int id_salon, int id_klijent)
    {
        Salon s = await Context.Saloni.FindAsync(id_salon);
        Klijent k = await Context.Klijenti.FindAsync(id_klijent);
        if(s==null || k == null)
            return BadRequest("Salon ne postoji.");
        try{
            Pitanje p = new Pitanje{
                tekstP = tekst,
                tekstO = null,
                datumPostavljanja = DateTime.Now,
                datumOdgovaranja = null,
                Salon = s,
                Klijent = k
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

    [HttpPost("PosaljiZahtev/{imeLjubimca}/{zivotinja}/{id_salon}/{klijentID}/{uslugaID}")]
    public async Task<ActionResult<Zahtev>> PosaljiZahtev(string imeLjubimca, string zivotinja, int id_salon, int klijentID, int uslugaID) 
    {
        try
        {
            Salon s = await Context.Saloni.FindAsync(id_salon);
            Klijent k = await Context.Klijenti.FindAsync(klijentID);
            Usluga u = await Context.Usluge.FindAsync(uslugaID);
            if(s==null || k==null || u==null)
                return BadRequest("Salon ne postoji.");
                else
                {
                    Zahtev z = new Zahtev{
                    Salon = s,
                    Klijent = k,
                    Usluga = u,
                    imeLjubimca = imeLjubimca,
                    zivotinja = zivotinja,
                    cena = u.cena, 
                    datumVreme = DateTime.Now,
                    status = "Neobrađen",
                    komentarSalona = "Sačekajte odgovor salona."
                    };
                    Context.Zahtevi.Add(z);
                    await Context.SaveChangesAsync();
                    return Ok($"ID dodatog zahteva je: {z.ID}");
                }
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
            if(zahtev.status=="Potvrdjen")
                return BadRequest("Zahtev je vec potvrdjen!");
            
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

    [HttpPost("OceniSalon/{idSalona}/{tekst}/{ocena}/{klijentID}")]
    public async Task<ActionResult<Recenzija>> OceniSalon(int idSalona, string tekst, float ocena, int klijentID) 
    {
        try
        {
            var salon = await Context.Saloni.FindAsync(idSalona);
            var klijent = await Context.Klijenti.FindAsync(klijentID);

            if (salon != null)
            {   
                Recenzija r = new Recenzija{
                    tekst = tekst,
                    ocena = ocena,
                    datum = DateTime.Now,
                    Salon = salon,
                    Klijent = klijent
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

    [HttpPut("DodajUKorpu/{proizvodID}/{korpaID}/{kolicina}")]
    public async Task<ActionResult<Korpa>> DodajUKorpu(int proizvodID, int korpaID, int kolicina)
    {
        try
        {
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            var korpa = await Context.Korpe.FindAsync(korpaID);

            var kp = new KorpaProizvod{
                proizvodID = proizvodID,
                nazivProizvoda = proizvod.naziv,
                slikaProizvoda = proizvod.slika,
                korpaID = korpaID,
                kolicina = kolicina
            };
            if (korpa != null && proizvod != null)
            {
                korpa.ukupnaCena = korpa.ukupnaCena + proizvod.cena*kp.kolicina; 
                Context.Korpe.Update(korpa);
            }
            Context.KorpeProizvodi.Add(kp);
            await Context.SaveChangesAsync();
            return Ok($"ID dodatog proizvoda je: {proizvod.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut("PromeniKolicinu/{id_proizvod}/{id_korpa}/{kolicina}")]
    public async Task<ActionResult<Korpa>> PromeniKolicinu(int id_proizvod,int id_korpa,int kolicina)
    {
        try
        {
            var proizvod_korpa = Context.KorpeProizvodi.Where(kp=>kp.proizvodID==id_proizvod && kp.korpaID==id_korpa).FirstOrDefault();
            Proizvod proizvod = await Context.Proizvodi.FindAsync(id_proizvod);
            Korpa korpa = await Context.Korpe.FindAsync(id_korpa);

            korpa.ukupnaCena-=proizvod.cena*proizvod_korpa.kolicina;
            korpa.ukupnaCena+=proizvod.cena*kolicina;

            proizvod_korpa.kolicina=kolicina;

            Context.KorpeProizvodi.Update(proizvod_korpa);
            Context.Korpe.Update(korpa);
            await Context.SaveChangesAsync();
            return Ok(korpa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("VratiProizvodeIzKorpe/{id_korpa}")]
    public async Task<ActionResult<List<KorpaProizvod>>> VratiProizvodeIzKorpe(int id_korpa)
    {
        Korpa k = await Context.Korpe
                    .Include(k => k.Proizvodi)
                    .FirstOrDefaultAsync(k => k.ID == id_korpa);
        return k.Proizvodi;
    }
   
    [HttpPut("IzbaciIzKorpe/{proizvodID}/{korpaID}")]
    public async Task<ActionResult<Korpa>> IzbaciIzKorpe(int proizvodID, int korpaID)
    {
        try
        {
            var proizvod_korpa = Context.KorpeProizvodi.Where(p=>p.korpaID==korpaID && p.proizvodID==proizvodID).FirstOrDefault();
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null && proizvod != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena - proizvod.cena*proizvod_korpa.kolicina;
                Context.Korpe.Update(staraKorpa);
            }
            Context.KorpeProizvodi.Remove(proizvod_korpa);
            await Context.SaveChangesAsync();
            return Ok($"ID izbačenog proizvoda je: {proizvod.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("Naruci/{korpaID}/{salonID}")]
    public async Task<ActionResult<Narudzbina>> Naruci(int korpaID,int salonID)
    {
        try
        {
            Korpa k = await Context.Korpe
                    .Include(k => k.Proizvodi)
                    .FirstOrDefaultAsync(k => k.ID == korpaID);
            Klijent klijent = Context.Klijenti.Include(k=>k.Korisnik).Where(k=>k.Korpa.ID==korpaID).FirstOrDefault();
            //Console.WriteLine(klijent.ID);
            var salon = await Context.Saloni.FindAsync(salonID);

            if (k == null || salon==null)
            {
                return Ok("Neuspesno narucivanje!");
            }

            Narudzbina n = new Narudzbina{
                    status = "Neobrađena",
                    komentarSalona = "Salon nije uneo komentar.",
                    ukupnaCena = k.ukupnaCena,
                    datum = DateTime.Now,
                    Korpa=k,
                    Klijent=klijent,
                    korisnickoIme=klijent.Korisnik.korisnickoIme,
                    adresa=klijent.adresa,
                    grad=klijent.grad,
                    Salon=salon,
                    NaruceniProizvodi=new List<NaruceniProizvod>()
                };

            foreach(KorpaProizvod kp in k.Proizvodi)
            {
                NaruceniProizvod np = new NaruceniProizvod{
                    nazivProizvoda=kp.nazivProizvoda,
                    slikaProizvoda=kp.slikaProizvoda,
                    kolicina=kp.kolicina,
                    Narudzbina=n,
                    Klijent=klijent
                };
                Context.NaruceniProizvodi.Add(np);
            }
            Context.Narudzbine.Add(n);
            
            var izbaciti = await Context.KorpeProizvodi.Where(k=>k.korpaID==korpaID).ToListAsync();
            Context.KorpeProizvodi.RemoveRange(izbaciti);
            k.ukupnaCena=0;

            await Context.SaveChangesAsync();
            return Ok(n);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("VratiProizvodeNarudzbina/{id_narudzbine}")]
    public async Task<ActionResult<List<NaruceniProizvod>>> VratiProizvodeNarudzbina(int id_narudzbine)
    {
        Narudzbina n = await Context.Narudzbine
                    .Include(n => n.NaruceniProizvodi)
                    .FirstOrDefaultAsync(n => n.ID == id_narudzbine);
        return n.NaruceniProizvodi;
    }


}