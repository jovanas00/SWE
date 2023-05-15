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
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> DodajUslugu(string naziv, float cena, string opis, bool dostupnost, int id_salon)
    {
        //preko korisnika nalazis salon
        Salon s = await Context.Saloni.FindAsync(id_salon);
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
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> ObrisiUslugu(int id_usluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u==null)
            return NotFound();
        try
            {  
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
    //[Authorize(Roles ="Salon")]
    public async Task<ActionResult<Usluga>> IzmeniUslugu(int id_usluga, string naziv, float cena, string opis, bool dostupnost)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u == null)
            return NotFound();
        try{ 
            if (!string.IsNullOrEmpty(naziv))  
                u.Naziv = naziv;
            if (cena != default(float))
                u.cena = cena;
            if (!string.IsNullOrEmpty(opis))
                u.opis = opis;
            if (dostupnost != default(bool))
                u.dostupnost = dostupnost;
            await Context.SaveChangesAsync();
            return Ok(u);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 

    // [Route("IzmeniDostupnost/{id_usluga}")]
    // [HttpPut]
    // //[Authorize(Roles ="Salon")]
    // public async Task<ActionResult<Usluga>> IzmeniDostupnost(int id_usluga)
    // {
    //     Usluga u = await Context.Usluge.FindAsync(id_usluga);
    //     if(u == null)
    //         return NotFound();
    //     try{   
    //         if(u.dostupnost==true)
    //         {
    //             u.dostupnost=false;
    //         }
    //         else
    //             u.dostupnost=true;
    //         await Context.SaveChangesAsync();
    //         return Ok(u);
    //     }
    //     catch(Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }    
    // } 

    // [Route("VratiUslugeSalona/{id_salon}")]
    // [HttpGet]
    // //[AllowAnonymous]
    // public async Task<ActionResult<IEnumerable<Usluga>>> VratiUslugeSalona(int id_salon)
    // {
    //     var usluge = await Context.Usluge.Where(u => u.Salon.ID == id_salon).ToListAsync();
    //     return usluge;
    // }

    // [Route("VratiUsluge/{id_salon}")]
    // [HttpGet]
    // //[AllowAnonymous]
    // public async Task<ActionResult<IEnumerable<object>>> VratiUsluge(int id_salon)
    // {
    //     var usluge = await Context.Usluge.Where(u => u.Salon.ID == id_salon).ToListAsync();
    //     var p = usluge.Select(p=>new{
    //         naziv=p.Naziv,
    //         ID=p.ID
    //     });
    //     return Ok(p);
    // }

    [Route("VratiUslugeSalona/{id_salon}")]
    [HttpGet]
    //[AllowAnonymous]
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