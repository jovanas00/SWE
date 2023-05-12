using System.Globalization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Klijent")]
public class KlijentController : ControllerBase
{
    public PPContext Context { get; set; }
    public KlijentController(PPContext context)
    {
        Context = context;
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
                ID = int.Parse(Tvrdnja.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value)
            };
        }
        return null;
    }


    [Route("IzmeniProfilKlijenta/{korisnicko_ime}/{ime}/{prezime}/{adresa}/{grad}/{brojTelefona}")]
    [HttpPut]
    public async Task<ActionResult<Klijent>> IzmeniProfil(/*bez korisnickog imena*/string korisnicko_ime, string ime, string prezime, string adresa, string grad, string brojTelefona)
    {
        //Korisnik k = VratiKorisnika()
        var k = await Context.Korisnici.Where(p => p.korisnickoIme == /*k.*/korisnicko_ime).FirstOrDefaultAsync();
        if (k == null)
            return NotFound();
        var klijent = await Context.Klijenti.Where(p => p.Korisnik == k).FirstOrDefaultAsync();
        try
        {
            klijent.ime = ime;
            klijent.prezime = prezime;
            klijent.adresa = adresa;
            klijent.grad = grad;
            klijent.brojTelefona = brojTelefona;
            await Context.SaveChangesAsync();
            return Ok(k);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PostaviPitanje/{tekst}/{id_salon}")]
    [HttpPost]
    public async Task<ActionResult<Klijent>> PostaviPitanje(string tekst, int id_salon, int id_klijent)
    {
        Korisnik k = VratiKorisnika();
        Salon s = await Context.Saloni.FindAsync(id_salon);
        Klijent kl = Context.Klijenti.Where(kl => kl.Korisnik.ID == k.ID).FirstOrDefault();
        if (s == null || k == null)
            return BadRequest("Salon ne postoji.");
        try
        {
            Pitanje p = new Pitanje
            {
                tekstP = tekst,
                tekstO = null,
                datumPostavljanja = DateTime.Now,
                datumOdgovaranja = null,
                Salon = s,
                Klijent = kl
            };
            Context.Pitanja.Add(p);
            await Context.SaveChangesAsync();

            return Ok(p);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost("PosaljiZahtev/{imeLjubimca}/{zivotinja}/{id_salon}/{usluga}/{dan}/{mesec}/{godina}/{vreme}")]
    public async Task<ActionResult<Zahtev>> PosaljiZahtev(string imeLjubimca, string zivotinja, int id_salon, string usluga,string dan,string mesec,string godina,string vreme)
    {
        try
        {
            Korisnik k = VratiKorisnika();
            Salon s = await Context.Saloni.FindAsync(id_salon);
            Klijent kl = Context.Klijenti.Where(kl => kl.Korisnik.ID == k.ID).FirstOrDefault();
            Usluga u = Context.Usluge.Where(u=>u.Naziv==usluga && u.Salon.ID==s.ID).FirstOrDefault();
            if (s == null || k == null || u == null)
                return BadRequest("Salon ne postoji.");
            else
            {
                string dateString = $"{dan}-{mesec}-{godina}";
                string timeString = vreme;
                string dateTimeString = $"{dateString} {timeString}";

                DateTime termin = DateTime.ParseExact(dateTimeString, "dd-MM-yyyy HH:mm", CultureInfo.InvariantCulture);
                Zahtev z = new Zahtev
                {
                    Salon = s,
                    Klijent = kl,
                    Usluga = u,
                    imeLjubimca = imeLjubimca,
                    zivotinja = zivotinja,
                    cena = u.cena,
                    datumVreme = termin,
                    status = "Neobrađen",
                    komentarSalona = "Sačekajte odgovor salona."
                };
                Context.Zahtevi.Add(z);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat zahtev,sacekajte odgovor salona!");
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
            if (zahtev.status == "Potvrdjen")
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

    [HttpPost("OceniSalon/{tekst}/{ocena}/{idSalona}")]
    public async Task<ActionResult<string>> OceniSalon(string tekst, float ocena, int idSalona)
    {
        try
        {
            Korisnik k = VratiKorisnika();
            var salon = await Context.Saloni.FindAsync(idSalona);
            var klijent = await Context.Klijenti.Include(k => k.Korisnik).Where(kl => kl.Korisnik.korisnickoIme == k.korisnickoIme).FirstOrDefaultAsync();

            Recenzija postojeca = await Context.Recenzije.Include(k=>k.Klijent).Include(s=>s.Salon).Where(k => k.Salon.ID == idSalona && k.Klijent.ID == klijent.ID).FirstOrDefaultAsync();
            if (postojeca != null)
            {
                return "Vec ste ocenili salon!";
            }

            if (salon != null)
            {
                Recenzija r = new Recenzija
                {
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
                return "Ne postoji salon!";
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("VratiKorpuID/{korisnicko_ime}")]
    [HttpGet]
    public async Task<ActionResult<int>> VratiKorpuID(string korisnicko_ime)
    {   
        //Korisnik k = VratiKorisnika();
        Klijent kl = await Context.Klijenti.Include(k=>k.Korisnik).Where(k=>k.Korisnik.korisnickoIme==korisnicko_ime).FirstOrDefaultAsync();
        Korpa korpa = Context.Korpe.Include(k=>k.Klijent).Where(k=>k.Klijent.ID==kl.ID).FirstOrDefault();
        return korpa.ID;
    }

    [HttpPut("DodajUKorpu/{proizvodID}")]
    public async Task<ActionResult<Korpa>> DodajUKorpu(int proizvodID)
    {
        try
        {
            Korisnik korisnik = VratiKorisnika();
            Klijent kl = Context.Klijenti.Include(k => k.Korisnik).Where(k => k.Korisnik.korisnickoIme == korisnik.korisnickoIme).FirstOrDefault();
            var korpa = Context.Korpe.Where(k => k.Klijent.ID == kl.ID).FirstOrDefault();
            //Korpa kor = ...nadjes korpu na osnovu kl.ID
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            //var korpa = await Context.Korpe.FindAsync(korpaID);

            var kp2 = Context.KorpeProizvodi.Where(kp => kp.korpaID == korpa.ID && kp.proizvodID == proizvodID).FirstOrDefault();
            if (kp2 != null)
            {
                kp2.kolicina += 1;
                Context.KorpeProizvodi.Update(kp2);
                korpa.ukupnaCena += proizvod.cena;
                Context.Korpe.Update(korpa);
                await Context.SaveChangesAsync();
                return Ok($"ID  ponovno dodatog proizvoda je: {proizvod.ID}");
            }
            else
            {
                var kp = new KorpaProizvod
                {
                    proizvodID = proizvodID,
                    nazivProizvoda = proizvod.naziv,
                    slikaProizvoda = proizvod.slika,
                    korpaID = korpa.ID,
                    kolicina = 1
                };
                if (korpa != null && proizvod != null)
                {
                    korpa.ukupnaCena = korpa.ukupnaCena + proizvod.cena * kp.kolicina;
                    Context.Korpe.Update(korpa);
                }
                Context.KorpeProizvodi.Add(kp);
                await Context.SaveChangesAsync();
                return Ok($"ID dodatog proizvoda je: {proizvod.ID}");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("VratiProizvodeIzKorpe/{id_korpa}")]
    public async Task<ActionResult<List<KorpaProizvod>>> VratiProizvodeIzKorpe(int id_korpa)
    {
        //nadjes korpu isto kao gore
        Korpa k = await Context.Korpe
                    .Include(k => k.Proizvodi)
                    .FirstOrDefaultAsync(k => k.ID == id_korpa);
        return k.Proizvodi;
    }

    [HttpDelete("IzbaciIzKorpe/{proizvodID}/{korpaID}")]
    public async Task<ActionResult<Korpa>> IzbaciIzKorpe(int proizvodID, int korpaID)
    {
        try
        {
            var proizvod_korpa = Context.KorpeProizvodi.Where(p => p.korpaID == korpaID && p.proizvodID == proizvodID).FirstOrDefault();
            var proizvod = await Context.Proizvodi.FindAsync(proizvodID);
            var staraKorpa = await Context.Korpe.FindAsync(korpaID);
            if (staraKorpa != null && proizvod != null)
            {
                staraKorpa.ukupnaCena = staraKorpa.ukupnaCena - proizvod.cena * proizvod_korpa.kolicina;
                Context.Korpe.Update(staraKorpa);
            }
            Context.KorpeProizvodi.Remove(proizvod_korpa);
            await Context.SaveChangesAsync();
            return Ok("Uspesno izbacen proizvod!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("Naruci/{korpaID}/{salonID}")]
    public async Task<ActionResult<Narudzbina>> Naruci(int korpaID, int salonID)
    {
        try
        {
            //isto kao gore
            Korpa k = await Context.Korpe
                    .Include(k => k.Proizvodi)
                    .FirstOrDefaultAsync(k => k.ID == korpaID);
            Klijent klijent = Context.Klijenti.Include(k => k.Korisnik).Where(k => k.Korpa.ID == korpaID).FirstOrDefault();
            //Console.WriteLine(klijent.ID);
            var salon = await Context.Saloni.FindAsync(salonID);

            if (k == null || salon == null)
            {
                return Ok("Neuspesno narucivanje!");
            }
            if(k.ukupnaCena==0)
            {
                return Ok("Nemate nista u korpi!");
            }
            Narudzbina n = new Narudzbina
            {
                status = "Neobrađena",
                komentarSalona = "Salon nije uneo komentar.",
                ukupnaCena = k.ukupnaCena,
                datum = DateTime.Now,
                Korpa = k,
                Klijent = klijent,
                korisnickoIme = klijent.Korisnik.korisnickoIme,
                adresa = klijent.adresa,
                grad = klijent.grad,
                Salon = salon,
                NaruceniProizvodi = new List<NaruceniProizvod>()
            };

            foreach (KorpaProizvod kp in k.Proizvodi)
            {
                NaruceniProizvod np = new NaruceniProizvod
                {
                    nazivProizvoda = kp.nazivProizvoda,
                    slikaProizvoda = kp.slikaProizvoda,
                    kolicina = kp.kolicina,
                    Narudzbina = n,
                    Klijent = klijent
                };
                Context.NaruceniProizvodi.Add(np);
            }
            Context.Narudzbine.Add(n);

            var izbaciti = await Context.KorpeProizvodi.Where(k => k.korpaID == korpaID).ToListAsync();
            Context.KorpeProizvodi.RemoveRange(izbaciti);
            float cena = k.ukupnaCena;
            k.ukupnaCena = 0;

            await Context.SaveChangesAsync();
            return Ok($"Uspesna narudzbina,ukupna cena {cena}");
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

    [Route("VratiKlijenta/{korisnicko_ime}")]
    [HttpGet]
    public async Task<ActionResult<object>> VratiKlijenta(string korisnicko_ime)
    {
        Korisnik kor = Context.Korisnici.Where(k => k.korisnickoIme == korisnicko_ime).FirstOrDefault();
        Klijent kl = await Context.Klijenti.Include(k => k.Korisnik).Where(k => k.Korisnik.ID == kor.ID).FirstOrDefaultAsync();
        return kl;
    }


}