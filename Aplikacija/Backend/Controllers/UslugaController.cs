namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class UslugaController : ControllerBase
{
    public PPContext Context { get; set; }
    public UslugaController(PPContext context)
    {
        Context = context;
    }

    [Route("DodajUslugu/{naziv}/{cena}/{opis}/{kapacitet}/{dostupnost}/{id_salon}")]
    [HttpPost]
    public async Task<ActionResult<Usluga>> DodajUslugu(string naziv, float cena, string opis, int kapacitet, bool dostupnost, int id_salon)
    {
        Salon s = await Context.Saloni.FindAsync(id_salon);
        if(s==null)
                return NotFound();
        try
            {  
                
                Usluga u = new Usluga{
                    Naziv=naziv,
                    cena=cena,
                    opis=opis,
                    dostupnost=true,
                    Salon=s//??
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
    [HttpPost]
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
    public async Task<ActionResult<Usluga>> IzmeniUslugu(int id_usluga,string naziv,float cena,string opis)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u == null)
            return NotFound();
        try{    
            u.Naziv = naziv;
            u.cena = cena;
            u.opis = opis;
            await Context.SaveChangesAsync();
            return Ok(u);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 

    [Route("IzmeniDostupnost/{id_usluga}")]
    [HttpPut]
    public async Task<ActionResult<Usluga>> IzmeniDostupnost(int id_usluga)
    {
        Usluga u = await Context.Usluge.FindAsync(id_usluga);
        if(u == null)
            return NotFound();
        try{   
            if(u.dostupnost==true)
            {
                u.dostupnost=false;
            }
            else
                u.dostupnost=true;
            await Context.SaveChangesAsync();
            return Ok(u);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }    
    } 

    [Route("VratiUslugeSalona/{id_salon}")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usluga>>> VratiUslugeSalona(int id_salon)
    {
        var usluge = await Context.Usluge.Where(u => u.Salon.ID == id_salon).ToListAsync();
        return usluge;
    }
}