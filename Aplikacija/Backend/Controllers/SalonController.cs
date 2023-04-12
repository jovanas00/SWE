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

    [Route("IzmeniProfilSalona/{id_salon}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniProfil(int id_salon, Salon noviSalon)
    {
        var s = await Context.Saloni.FindAsync(id_salon);
        if(s == null)
            return NotFound();
        try{
            s.naziv = noviSalon.naziv;
            s.adresa = noviSalon.adresa;
            s.grad = noviSalon.grad;
            //s.ProsecnaOcena = noviSalon.ProsecnaOcena; - treba li ovo kod izmenu profila
            s.brojTelefona = noviSalon.brojTelefona;
            await Context.SaveChangesAsync();

            return Ok();
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
}