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
                    cena = 0, 
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

    /*[HttpPost("PošaljiZahtev/{idSalona}/{imeLjubimca}/{zivotinja}")]//a koja je usluga, to treba iz klase usluga??
    public async Task<ActionResult<Zahtev>> PošaljiZahtev(int idSalona, string imeLjubimca, string zivotinja) 
    {
        try
        {
            Salon s = await Context.Saloni.FindAsync(idSalona);
            if (s != null)
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
            else 
            return Ok("Nije pronađen Vaš salon");


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
                    Salon = salon, //izračunavanje prosečne ocene 
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

            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            var kp = new KorpaProizvod{
                proizvodID = proizvodID,
                nazivProizvoda = proizvod.naziv,
                slikaProizvoda = "Nema trenutno",
                korpaID = korpaID,
                Kolicina = kolicina
            };
            //staraKorpa.Proizvodi.Add(kp);
            /*List<KorpaProizvod> lista = new List<KorpaProizvod>();
            lista.Add(kp);
            staraKorpa.Proizvodi = lista;
            foreach (KorpaProizvod pk in lista){
                Console.WriteLine(pk.nazivProizvoda);
            }*/
            //lista = new List<KorpaProizvod>();
            //lista.Add(kp);
            List<KorpaProizvod> lista = staraKorpa.Proizvodi;
            lista.Add(kp);
            if (staraKorpa != null && proizvod != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena + proizvod.cena*kp.Kolicina; 
                Context.Korpe.Update(staraKorpa);
            }

                Context.KorpeProizvodi.Add(kp);
                await Context.SaveChangesAsync();
            //Context.Proizvodi.Add(proizvod);
            await Context.SaveChangesAsync();
            return Ok($"ID dodatog proizvoda je: {proizvod.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
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
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena - proizvod.cena*proizvod_korpa.Kolicina; //samo cenu oduzme od ukupne cene?
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

    
    [HttpPost("Naruci/{korpaID}/{klijentID}/{salonID}")]
    public async Task<ActionResult<Narudzbina>> Naruci(int korpaID, int klijentID, int salonID)
    {
        try
        {
            var korpa = await Context.Korpe.FindAsync(korpaID);
            var klijent = await Context.Klijenti.FindAsync(klijentID);
            var salon = await Context.Saloni.FindAsync(salonID);
            if (korpa == null)
            {
                return Ok("Nije pronađena korpa.");
            }

            Narudzbina n = new Narudzbina{
                    status = "Neobrađena",
                    komentarSalona = "Salon nije uneo komentar.",
                    ukupnaCena = korpa.ukupnaCena,
                    datum = DateTime.Now,
                    Korpa=korpa,
                    Klijent=klijent,
                    Salon=salon,
                    //proizvodi=korpa.Proizvodi
                };
                Context.Narudzbine.Add(n);
                await Context.SaveChangesAsync();
                foreach(KorpaProizvod kp in korpa.Proizvodi)
                {
                    Console.WriteLine(kp.nazivProizvoda);
                }
            return Ok(n.proizvodi);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



}