using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
//[Authorize(Roles ="Salon")]
public class UslugaController : ControllerBase
{
    public PPContext Context { get; set; }
    public UslugaController(PPContext context)
    {
        Context = context;
    }

    [Route("DodajUslugu/{naziv}/{cena}/{opis}/{dostupnost}/{id_salon}")]
    [HttpPost]
    [Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> DodajUslugu(string naziv, float cena, string opis, bool dostupnost, int id_salon)
    {
        //preko korisnika nalazis salon
        Salon s = await Context.Saloni.FindAsync(id_salon);
        Usluga postojeca = Context.Usluge.Include(s=>s.Salon).Where(u=>u.Naziv==naziv && u.Salon.ID==id_salon).FirstOrDefault();
        if(postojeca!=null)
            return Ok("Vec postoji usluga sa tim imenom!");
        if(s==null)
                return NotFound();
        try
            {  
                
                Usluga u = new Usluga{
                    Naziv=naziv,
                    cena=cena,
                    opis=opis,
                    dostupnost=dostupnost,
                    Salon=s
                };
                Context.Usluge.Add(u);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata usluga.");
            }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("ObrisiUslugu/{id_usluga}")]
    [HttpDelete]
    [Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> ObrisiUslugu(int id_usluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u==null)
            return NotFound();
        try
            {  
                List<Zahtev> zahtevi =await Context.Zahtevi.Include(u=>u.Usluga).Where(z=>z.Usluga.ID==id_usluga).ToListAsync();
                foreach(Zahtev z in zahtevi)
                {
                    z.Usluga=null;
                    Context.Zahtevi.Update(z);
                    //Context.Zahtevi.Remove(z);
                }
                Context.Usluge.Remove(u);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana usluga.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
    }

    [Route("IzmeniUslugu/{id_usluga}")]
    [HttpPut]
    [Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> IzmeniUslugu(int id_usluga, string naziv, float cena, string opis, bool dostupnost)
    {
        Usluga usluga = await Context.Usluge.Include(s=>s.Salon).Where(u=>u.ID==id_usluga).FirstOrDefaultAsync();
        if(usluga == null)
            return NotFound();
        Usluga postojeca = Context.Usluge.Include(s=>s.Salon).Where(u=>u.Naziv==naziv && u.Salon.ID==usluga.Salon.ID).FirstOrDefault();
        if(postojeca!=null)
            return Ok("Vec postoji usluga sa tim imenom!");
        try{ 
            if (!string.IsNullOrEmpty(naziv))  
                usluga.Naziv = naziv;
            if (cena != default(float) || cena>0)
                usluga.cena = cena;
            if (!string.IsNullOrEmpty(opis))
                usluga.opis = opis;
            usluga.dostupnost = dostupnost;
            await Context.SaveChangesAsync();
            return Ok(usluga);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    }

    [Route("VratiUslugeSalona/{id_salon}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> VratiUslugeSalona(int id_salon)
    {
        var usluge = await Context.Usluge.Where(u => u.Salon.ID == id_salon).ToListAsync();
        var result = usluge.Select(u=> new
        {
            ID = u.ID,
            naziv = u.Naziv,
            cena = u.cena,
            opis = u.opis,
            dostupnost = u.dostupnost
        });
        return Ok(result);
    }
}