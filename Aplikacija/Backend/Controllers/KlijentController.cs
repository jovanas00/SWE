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

    [Route("IzmeniProfilKlijenta/{id_klijent}")]
    [HttpPut]
    public async Task<ActionResult<Klijent>> IzmeniProfil(int id_klijent, Klijent noviKlijent)
    {
        var k = await Context.Klijenti.FindAsync(id_klijent);
        if(k == null)
            return NotFound();
        try{
            k.ime = noviKlijent.ime;
            k.prezime = noviKlijent.prezime;
            k.adresa = noviKlijent.adresa;
            k.grad = noviKlijent.grad;
            k.brojTelefona = noviKlijent.brojTelefona;
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
}